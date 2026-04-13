import { Shield, Zap, RefreshCw, Wind } from "lucide-react";
import productPuffer from "@/assets/product-puffer.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductPuffer = () => (
  <ProductPageLayout
    name="designer Jacket Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    paymentLink="https://buy.stripe.com/00w9ASgDKd5W5vS5Ry8Ra08"
    image={productPuffer}
    description="High-quality designer jacket suppliers with trending styles and fast shipping. Source the hottest winter outerwear at wholesale prices."
    features={[
      { icon: Wind, title: "Trending Styles", desc: "Access suppliers with the latest designer jacket designs and trending outerwear." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "designer Jacket Suppliers",
      "Trending Outerwear Sources",
      "Wholesale Pricing Contacts",
      "Style & Trend Guide",
      "Quality Verification Tips",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What types of jackets are covered?", a: "Our list includes suppliers for trending designer jackets, designer outerwear, and premium winter styles." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the designer jacket supplier list with all future updates." },
    ]}
  />
);

export default ProductPuffer;