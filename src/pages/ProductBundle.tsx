import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Shield, Zap, RefreshCw, ArrowLeft, Star, Package } from "lucide-react";
import { Link } from "react-router-dom";
import productJewelry from "@/assets/product-jewelry.png";
import ReviewsGrid from "@/components/ReviewsGrid";

const PRICE_ID = "price_1TG8uJPkl9P0JJ5qx0TQ3ccH";

const features = [
  { icon: Package, title: "8 Supplier Lists in One", desc: "Shoes, watches, earbuds, cologne, puffer jackets, lulu, CRM & more." },
  { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
  { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
  { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
];

const includes = [
  "Shoe Supplier List",
  "Luxury Watch Supplier List",
  "Earbud Supplier List",
  "Cologne Supplier List",
  "Puffer Jacket Supplier List",
  "Lulu Supplier List",
  "CRM Supplier List",
  "Future Lists (Free Updates)",
];

const faqs = [
  { q: "What do I get after purchase?", a: "You'll receive instant digital access to all 7+ supplier lists in PDF format, delivered to your email immediately." },
  { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing before being added." },
  { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
  { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files. See our refund policy for details." },
  { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to all current and future supplier lists in the bundle." },
];

const ProductBundle = () => {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const body: any = { priceId: PRICE_ID };
      if (coupon.trim()) body.couponCode = coupon.trim();

      const { data, error } = await supabase.functions.invoke("create-payment", { body });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      if (data?.url) window.open(data.url, "_blank");
    } catch {
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="container mx-auto px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative bg-card border border-foreground/20 rounded-2xl overflow-hidden">
              <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-lg">
                BEST DEAL
              </div>
              <div className="absolute top-3 right-3 z-10 bg-sale text-primary-foreground text-xs font-bold px-3 py-1 rounded-lg">
                65% OFF
              </div>
              <img src={productJewelry} alt="All Supplier Bundle — premium supplier lists" className="w-full aspect-square object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
              <span className="text-muted-foreground text-sm ml-1">500+ Happy Customers</span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl text-foreground leading-none mb-4">
              ALL SUPPLIER BUNDLE
            </h1>

            <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
              Get access to <span className="text-foreground font-semibold">every supplier list</span> we offer — shoes, watches, earbuds, cologne, puffer jackets & more. Updated weekly with new verified sources.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-muted-foreground line-through text-lg">$74.99 CAD</span>
              <span className="text-4xl md:text-5xl font-bold text-foreground">$25.99</span>
              <span className="text-muted-foreground text-lg">CAD</span>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                className="flex-1 bg-card border border-foreground/30 rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                onClick={() => { if (coupon.trim()) toast.success("Coupon will be applied at checkout!"); }}
                className="bg-secondary text-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors"
              >
                Apply
              </button>
            </div>

            {/* CTA */}
            <button
              onClick={handleBuy}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-lg font-heading tracking-wide uppercase glow-neon hover:bg-primary-light transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Instant Access — $25.99 CAD"}
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Checkout</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Instant Delivery</span>
              <span className="flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5" /> Free Updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="font-heading text-3xl md:text-5xl text-center text-foreground mb-10">What's Included</h2>
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {includes.map((item) => (
            <div key={item} className="flex items-center gap-3 bg-card border border-foreground/10 rounded-xl px-5 py-4">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="text-foreground text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="font-heading text-3xl md:text-5xl text-center text-foreground mb-10">Why This Bundle?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-foreground/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <f.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-card border border-foreground/10 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
          </div>
          <p className="text-foreground text-lg md:text-xl font-medium mb-2">
            "Best investment I've made for my reselling business. The suppliers are legit."
          </p>
          <p className="text-muted-foreground text-sm">— Verified Customer</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="font-heading text-3xl md:text-5xl text-center text-foreground mb-10">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-foreground/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-foreground text-sm font-medium">{faq.q}</span>
                <span className="text-muted-foreground text-lg">{openFaq === i ? "−" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">Ready to Start?</h2>
          <p className="text-muted-foreground mb-8">One-time payment. Instant access. Lifetime updates.</p>
          <button
            onClick={handleBuy}
            disabled={loading}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-heading tracking-wide uppercase glow-neon hover:bg-primary-light transition-all hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get the Bundle — $25.99 CAD"}
          </button>
        </div>
      </section>

      {/* Footer links */}
      <div className="container mx-auto px-4 pb-8 flex justify-center gap-6 text-xs text-muted-foreground">
        <Link to="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
        <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
      </div>
    </div>
  );
};

export default ProductBundle;
