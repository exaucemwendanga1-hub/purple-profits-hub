import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface OrderStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  revenueByDay: { date: string; revenue: number }[];
  topProducts: { name: string; count: number; revenue: number }[];
}

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }
    if (user) {
      checkAdmin();
    }
  }, [user, loading]);

  const checkAdmin = async () => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user!.id)
      .eq("role", "admin");
    
    if (!data || data.length === 0) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(true);
    fetchStats();
  };

  const fetchStats = async () => {
    const { data: orders } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "completed")
      .order("created_at", { ascending: false });

    if (!orders) {
      setLoadingStats(false);
      return;
    }

    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Group by day
    const byDay: Record<string, number> = {};
    orders.forEach((o) => {
      const day = o.created_at.slice(0, 10);
      byDay[day] = (byDay[day] || 0) + o.amount;
    });
    const revenueByDay = Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, revenue]) => ({ date, revenue: revenue / 100 }));

    // Top products
    const byProduct: Record<string, { count: number; revenue: number }> = {};
    orders.forEach((o) => {
      if (!byProduct[o.product_name]) byProduct[o.product_name] = { count: 0, revenue: 0 };
      byProduct[o.product_name].count++;
      byProduct[o.product_name].revenue += o.amount;
    });
    const topProducts = Object.entries(byProduct)
      .map(([name, v]) => ({ name, count: v.count, revenue: v.revenue / 100 }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    setStats({ totalRevenue: totalRevenue / 100, totalOrders, avgOrderValue: avgOrderValue / 100, revenueByDay, topProducts });
    setLoadingStats(false);
  };

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-destructive text-lg font-semibold mb-2">Access Denied</p>
            <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
            <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartConfig = {
    revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
        </div>

        {loadingStats ? (
          <p className="text-muted-foreground">Loading analytics...</p>
        ) : stats ? (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">${stats.totalRevenue.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Order Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">${stats.avgOrderValue.toFixed(2)}</div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            {stats.revenueByDay.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-foreground">Revenue (Last 14 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={stats.revenueByDay}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {/* Top Products */}
            {stats.topProducts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Orders</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.topProducts.map((p) => (
                        <TableRow key={p.name}>
                          <TableCell className="font-medium">{p.name}</TableCell>
                          <TableCell className="text-right">{p.count}</TableCell>
                          <TableCell className="text-right">${p.revenue.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
