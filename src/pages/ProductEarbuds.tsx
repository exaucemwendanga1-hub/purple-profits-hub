import { Shield, Zap, RefreshCw, Smartphone } from "lucide-react";
import productEarbuds from "@/assets/product-earbuds.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductEarbuds = () => (
  <ProductPageLayout
    name="electronics Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    paymentLink="https://buy.stripe.com/eVq6oG73a2ricYk5Ry8Ra06"
    image={productEarbuds}
    description="Top-rated electronics suppliers with the latest models at wholesale. Source trending tech products for your reselling business."
    features={[
      { icon: Smartphone, title: "Latest Models", desc: "Access suppliers with the newest tech and electronics models on the market." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "Electronics & Tech Suppliers",
      "Trending Gadgets",
      "Wholesale Pricing Contacts",
      "Product Comparison Guide",
      "Quality Verification Tips",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What types of electronics are covered?", a: "Our list includes suppliers for wireless devices, gadgets, and trending tech accessories from top brands." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the electronics supplier list with all future updates." },
    ]}
  />
);

export default ProductEarbuds;
