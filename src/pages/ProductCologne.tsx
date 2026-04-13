import { Shield, Zap, RefreshCw, Sparkles } from "lucide-react";
import productCologne from "@/assets/product-cologne.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductCologne = () => (
  <ProductPageLayout
    name="Cologne Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    paymentLink="https://buy.stripe.com/00w5kC87ed5W1fC5Ry8Ra07"
    image={productCologne}
    description="Authentic cologne and fragrance suppliers offering premium brands at unbeatable prices. Source high-demand fragrances for your reselling business."
    features={[
      { icon: Sparkles, title: "Premium Brands", desc: "Access suppliers carrying authentic designer fragrances and trending colognes." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "Cologne & Fragrance Suppliers",
      "Designer Brand Sources",
      "Wholesale Pricing Contacts",
      "Authenticity Verification Tips",
      "Best-Seller Recommendations",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What types of fragrances are covered?", a: "Our list includes suppliers for designer colognes, premium fragrances, and trending scents from top brands." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, authenticity, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the cologne supplier list with all future updates." },
    ]}
  />
);

export default ProductCologne;
