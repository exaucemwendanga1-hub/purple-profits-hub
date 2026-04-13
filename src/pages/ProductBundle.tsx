import { Package, Shield, Zap, RefreshCw } from "lucide-react";
import productBundle from "@/assets/product-bundle.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductBundle = () => (
  <ProductPageLayout
    name="All Supplier Bundle"
    price="$24.99"
    oldPrice="$74.99 CAD"
    discount="65%"
    paymentLink="https://buy.stripe.com/7sYaEWafm6Hygaweo48Ra05"
    image={productBundle}
    description="Get access to every supplier list we offer — shoes, watches, electronics, cologne, designer jackets & more. Updated weekly with new verified sources."
    features={[
      { icon: Package, title: "8 Supplier Lists in One", desc: "Shoes, watches, electronics, cologne, designer jackets, lulu, CRM & more." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "Shoe Supplier List",
      "Luxury Watch Supplier List",
      "electronics Supplier List",
      "Cologne Supplier List",
      "designer Jacket Supplier List",
      "Lulu Supplier List",
      "CRM Supplier List",
      "Future Lists (Free Updates)",
    ]}
    faqs={[
      { q: "What do I get after purchase?", a: "You'll receive instant digital access to all 7+ supplier lists in PDF format, delivered to your email immediately." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing before being added." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files. See our refund policy for details." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to all current and future supplier lists in the bundle." },
    ]}
  />
);

export default ProductBundle;