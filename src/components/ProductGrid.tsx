import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import productShoes from "@/assets/product-shoes.png";
import productWatch from "@/assets/product-watch.png";
import productEarbuds from "@/assets/product-earbuds.png";
import productCologne from "@/assets/product-cologne.png";
import productPuffer from "@/assets/product-puffer.png";
import productJewelry from "@/assets/product-jewelry.png";
import productLulu from "@/assets/product-lulu.png";
import productCrm from "@/assets/product-crm.png";

const products = [
  { name: "All Supplier Bundle", price: "$29.99", old: "$74.99 CAD", image: productJewelry, slug: "/bundle", bestDeal: true },
  { name: "Shoe Supplier", price: "$11.99 CAD", old: "$19.99 CAD", image: productShoes, slug: "/product/shoes" },
  { name: "Luxury Watch Supplier", price: "$11.99 CAD", old: "$19.99 CAD", image: productWatch, slug: "/product/watch" },
  { name: "Earbud Supplier", price: "$11.99 CAD", old: "$19.99 CAD", image: productEarbuds, slug: "/product/earbuds" },
  { name: "Cologne Supplier", price: "$11.99 CAD", old: "$19.99 CAD", image: productCologne, slug: "/product/cologne" },
  { name: "Puffer Jacket Supplier", price: "$11.99 CAD", old: "$19.99 CAD", image: productPuffer, slug: "/product/puffer" },
  { name: "Lulu Supplier", price: "$11.99 CAD", old: "$19.99 CAD", image: productLulu, slug: "/product/lulu" },
  { name: "CHME Supplier", price: "$11.99 CAD", old: "$19.99 CAD", image: productCrm, slug: "/product/crm" },
];

const ProductGrid = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

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

      <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-4xl mx-auto">
        {products.map((p) => (
          <div
            key={p.name}
            className="relative group bg-card border border-foreground/30 rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-foreground/60 hover:glow-purple-sm cursor-pointer active:scale-[0.97] active:translate-y-0 w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.875rem)]"
            onClick={() => navigate(p.slug)}
          >
            {/* Best Deal Badge */}
            {p.bestDeal && (
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

              <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                <span className="text-muted-foreground line-through text-xs md:text-sm">{p.old}</span>
                <span className="text-lg md:text-2xl font-bold text-foreground">{p.price}</span>
              </div>
              <button
                className="w-full bg-primary text-primary-foreground text-xs md:text-sm py-2 md:py-2.5 rounded-lg hover:bg-primary-light transition-colors font-heading tracking-wide uppercase mt-auto"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
