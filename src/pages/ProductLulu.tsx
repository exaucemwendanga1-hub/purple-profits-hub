import { Shield, Zap, RefreshCw, Dumbbell } from "lucide-react";
import productLulu from "@/assets/product-lulu.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductLulu = () => (
  <ProductPageLayout
    name="Lulu Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    priceId="price_1TICsCPkl9P0JJ5qikR7BRdq"
    image={productLulu}
    description="Premium athletic wear and activewear suppliers with Lululemon-style quality at wholesale prices. Source high-demand athleisure for your business."
    features={[
      { icon: Dumbbell, title: "Premium Athleisure", desc: "Access suppliers with Lululemon-quality activewear at wholesale prices." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "Activewear Suppliers",
      "Premium Athleisure Sources",
      "Wholesale Pricing Contacts",
      "Fabric Quality Guide",
      "Best-Seller Recommendations",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What types of activewear are covered?", a: "Our list includes suppliers for premium leggings, sports bras, athleisure tops, and Lululemon-style activewear." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the Lulu supplier list with all future updates." },
    ]}
  />
);

export default ProductLulu;
