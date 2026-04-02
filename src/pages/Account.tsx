import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Package, Download, LogOut, ArrowLeft } from "lucide-react";

interface Order {
  id: string;
  product_name: string;
  amount: number;
  currency: string;
  status: string;
  digital_asset_path: string | null;
  created_at: string;
}

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .single();
      if (profile) setDisplayName(profile.display_name || "");

      // Fetch orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (ordersData) setOrders(ordersData);
      setLoadingOrders(false);
    };

    fetchData();
  }, [user]);

  const handleDownload = async (order: Order) => {
    if (!order.digital_asset_path) return;
    setDownloadingId(order.id);
    try {
      const { data, error } = await supabase.storage
        .from("digital-products")
        .createSignedUrl(order.digital_asset_path, 60 * 60); // 1 hour

      if (error) throw error;
      if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    } catch {
      toast.error("Failed to generate download link. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleUpdateName = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("user_id", user.id);
    if (error) {
      toast.error("Failed to update name");
    } else {
      toast.success("Name updated!");
      setEditingName(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-heading text-3xl text-foreground">My Account</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <h2 className="text-foreground font-semibold mb-3">Profile</h2>
          <p className="text-muted-foreground text-sm mb-2">{user?.email}</p>
          <div className="flex items-center gap-2">
            {editingName ? (
              <>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-1.5 text-foreground text-sm focus:outline-none focus:border-primary/50"
                />
                <button onClick={handleUpdateName} className="text-primary-light text-sm font-medium">Save</button>
                <button onClick={() => setEditingName(false)} className="text-muted-foreground text-sm">Cancel</button>
              </>
            ) : (
              <>
                <span className="text-foreground text-sm">{displayName || "No name set"}</span>
                <button onClick={() => setEditingName(true)} className="text-primary-light text-sm font-medium">Edit</button>
              </>
            )}
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-primary-light" />
            <h2 className="text-foreground font-semibold">Order History</h2>
          </div>

          {loadingOrders ? (
            <p className="text-muted-foreground text-sm">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <Link to="/" className="text-primary-light hover:underline text-sm font-medium">
                Browse products →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border border-border rounded-lg p-4">
                  <div>
                    <p className="text-foreground font-medium text-sm">{order.product_name}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(order.created_at).toLocaleDateString()} · ${(order.amount / 100).toFixed(2)} {order.currency.toUpperCase()}
                    </p>
                  </div>
                  {order.digital_asset_path && (
                    <button
                      onClick={() => handleDownload(order)}
                      disabled={downloadingId === order.id}
                      className="flex items-center gap-1.5 bg-primary/10 text-primary-light px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
                    >
                      <Download size={14} />
                      {downloadingId === order.id ? "..." : "Download"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
