import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const products = [
  { name: "All Supplier Bundle", price: "$24.99", old: "$74.99", emoji: "📦", priceId: "price_1TG8uJPkl9P0JJ5qx0TQ3ccH" },
  { name: "Shoe Supplier", price: "$11.99", old: "$19.99", emoji: "👟", priceId: "price_1TG96qPkl9P0JJ5qXGXtNrmk" },
  { name: "Luxury Watch Supplier", price: "$11.99", old: "$19.99", emoji: "⌚", priceId: "price_1TGvFmPkl9P0JJ5qY6nfhFdm" },
  { name: "Earbud Supplier", price: "$11.99", old: "$19.99", emoji: "🎧", priceId: "price_1TGvG8Pkl9P0JJ5q5S2l1ceZ" },
  { name: "Cologne Supplier", price: "$11.99", old: "$19.99", emoji: "🧴", priceId: "price_1TGvH6Pkl9P0JJ5q4mg7eLmk" },
  
  { name: "Puffer Jacket Supplier", price: "$11.99", old: "$19.99", emoji: "🧥", priceId: "price_1TGvIwPkl9P0JJ5qVtH9gE7c" },
];

const ProductGrid = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBuy = async (priceId: string) => {
    setLoadingId(priceId);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { priceId },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section id="products" className="container mx-auto px-4 py-16">
      <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-12">All Products</h2>
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {products.map((p) => (
          <div key={p.name} className="group bg-card border border-border rounded-xl p-5 flex flex-col transition-all hover:-translate-y-1 hover:border-primary/50 hover:glow-purple-sm">
            <div className="flex justify-between items-start mb-3">
              <span className="text-3xl">{p.emoji}</span>
              <span className="bg-sale text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">SALE</span>
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-3 flex-1">{p.name}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-lg font-bold text-primary-light">{p.price}</span>
              <span className="text-muted-foreground line-through text-xs">{p.old}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 border border-primary/40 text-primary-light text-xs py-2 rounded-lg hover:bg-primary/10 transition-colors font-medium">Details +</button>
              <button
                onClick={() => handleBuy(p.priceId)}
                disabled={loadingId === p.priceId}
                className="flex-1 bg-primary text-primary-foreground text-xs py-2 rounded-lg hover:bg-primary-light transition-colors font-medium disabled:opacity-50"
              >
                {loadingId === p.priceId ? "Loading..." : "Buy Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
