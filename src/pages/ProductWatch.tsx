import { Shield, Zap, RefreshCw, Gem } from "lucide-react";
import productWatch from "@/assets/product-watch.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductWatch = () => (
  <ProductPageLayout
    name="Luxury Watch Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    paymentLink="https://buy.stripe.com/3cI7sKfzG7LC8I47ZG8Ra02"
    image={productWatch}
    description="Trusted luxury watch suppliers with verified quality and competitive pricing. Source premium timepieces at wholesale for maximum profit margins."
    features={[
      { icon: Gem, title: "Premium Brands", desc: "Access suppliers carrying luxury and designer watch brands at wholesale prices." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "Luxury Watch Suppliers",
      "Designer Brand Sources",
      "Wholesale Pricing Contacts",
      "Authentication Tips",
      "Quality Verification Guide",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What types of watches are covered?", a: "Our list includes suppliers for luxury watches, designer timepieces, and premium brands at wholesale pricing." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the watch supplier list with all future updates." },
    ]}
  />
);

export default ProductWatch;
