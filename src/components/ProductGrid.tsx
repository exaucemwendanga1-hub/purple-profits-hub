import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import productShoes from "@/assets/product-shoes.png";
import productWatch from "@/assets/product-watch.png";
import productEarbuds from "@/assets/product-earbuds.png";
import productCologne from "@/assets/product-cologne.png";
import productPuffer from "@/assets/product-puffer.png";
import productJewelry from "@/assets/product-jewelry.png";

const products = [
  { name: "All Supplier Bundle", price: "$25.99", old: "$74.99", image: productJewelry, priceId: "price_1TG8uJPkl9P0JJ5qx0TQ3ccH", bestDeal: true, description: "Get access to all supplier lists in one bundle. Includes shoes, watches, earbuds, cologne, puffer jackets & more. Updated weekly." },
  { name: "Shoe Supplier", price: "$11.99", old: "$19.99", image: productShoes, priceId: "price_1TG96qPkl9P0JJ5qXGXtNrmk", description: "Premium shoe suppliers for trending sneakers and designer footwear at wholesale prices." },
  { name: "Luxury Watch Supplier", price: "$11.99", old: "$19.99", image: productWatch, priceId: "price_1TGvFmPkl9P0JJ5qY6nfhFdm", description: "Trusted luxury watch suppliers with verified quality and competitive pricing." },
  { name: "Earbud Supplier", price: "$11.99", old: "$19.99", image: productEarbuds, priceId: "price_1TGvG8Pkl9P0JJ5q5S2l1ceZ", description: "Top-rated earbud and headphone suppliers with the latest models at wholesale." },
  { name: "Cologne Supplier", price: "$11.99", old: "$19.99", image: productCologne, priceId: "price_1TGvH6Pkl9P0JJ5q4mg7eLmk", description: "Authentic cologne and fragrance suppliers offering premium brands at unbeatable prices." },
  { name: "Puffer Jacket Supplier", price: "$11.99", old: "$19.99", image: productPuffer, priceId: "price_1TGvIwPkl9P0JJ5qVtH9gE7c", description: "High-quality puffer jacket suppliers with trending styles and fast shipping." },
];

const ProductGrid = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const handleBuy = async (priceId: string) => {
    setLoadingId(priceId);
    try {
      const body: any = { priceId };
      if (couponCode.trim()) {
        body.couponCode = couponCode.trim();
      }

      const { data, error } = await supabase.functions.invoke("create-payment", {
        body,
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
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
      <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-8">All Products</h2>

      {/* Coupon Code Input */}
      <div className="max-w-md mx-auto mb-10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              setCouponApplied(false);
            }}
            className="flex-1 bg-card border border-foreground/30 rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={() => {
              if (couponCode.trim()) {
                setCouponApplied(true);
                toast.success("Coupon will be applied at checkout!");
              }
            }}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors"
          >
            Apply
          </button>
        </div>
        {couponApplied && (
          <p className="text-sm text-primary-light mt-2">✓ Coupon "{couponCode}" will be applied at checkout</p>
        )}
        <p className="text-muted-foreground text-xs mt-1">You can also enter coupon codes directly on the checkout page</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
        {products.map((p) => (
          <div
            key={p.name}
            className="relative group bg-card border border-foreground/30 rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-foreground/60 hover:glow-purple-sm cursor-pointer active:scale-[0.97] active:translate-y-0"
            onClick={() => handleBuy(p.priceId)}
          >
            {/* Best Deal Badge */}
            {"bestDeal" in p && p.bestDeal && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-muted-foreground text-background text-[10px] md:text-xs font-bold px-3 py-1 rounded-b-lg tracking-wide">
                BEST DEAL
              </div>
            )}

            {/* Image Area */}
            <div className="relative w-full aspect-square overflow-hidden">
              <span className="absolute top-2 left-2 z-10 bg-card/80 backdrop-blur-sm text-foreground text-[10px] md:text-xs font-semibold px-3 py-1 rounded-lg border border-foreground/20">
                Sale
              </span>
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-3 md:p-5 flex flex-col flex-1 items-center text-center">
              <h3 className="font-heading text-sm md:text-lg text-foreground mb-2 md:mb-3 uppercase leading-tight">
                {p.name}
              </h3>

              {/* Expandable Details */}
              <div
                className={`overflow-hidden transition-all duration-300 w-full ${
                  expandedId === p.priceId ? "max-h-40 opacity-100 mb-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                <span className="text-muted-foreground line-through text-xs md:text-sm">{p.old}</span>
                <span className="text-lg md:text-2xl font-bold text-foreground">{p.price}</span>
              </div>
              <div className="flex flex-col gap-2 w-full mt-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === p.priceId ? null : p.priceId); }}
                  className="w-full border border-foreground/30 text-foreground text-xs md:text-sm py-2 md:py-2.5 rounded-lg hover:bg-primary/10 transition-colors font-heading tracking-wide uppercase"
                >
                  {expandedId === p.priceId ? "Details −" : "Details +"}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleBuy(p.priceId); }}
                  disabled={loadingId === p.priceId}
                  className="w-full bg-primary text-primary-foreground text-xs md:text-sm py-2 md:py-2.5 rounded-lg hover:bg-primary-light transition-colors font-heading tracking-wide uppercase disabled:opacity-50"
                >
                  {loadingId === p.priceId ? "Loading..." : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
