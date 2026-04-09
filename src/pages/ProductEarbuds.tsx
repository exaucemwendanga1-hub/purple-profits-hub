import { Shield, Zap, RefreshCw, Headphones } from "lucide-react";
import productEarbuds from "@/assets/product-earbuds.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductEarbuds = () => (
  <ProductPageLayout
    name="Earbud Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    priceId="price_1TGvG8Pkl9P0JJ5q5S2l1ceZ"
    image={productEarbuds}
    description="Top-rated earbud and headphone suppliers with the latest models at wholesale. Source trending audio products for your reselling business."
    features={[
      { icon: Headphones, title: "Latest Models", desc: "Access suppliers with the newest earbuds and headphone models on the market." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "Earbud & Headphone Suppliers",
      "Trending Audio Products",
      "Wholesale Pricing Contacts",
      "Product Comparison Guide",
      "Quality Verification Tips",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What types of earbuds are covered?", a: "Our list includes suppliers for wireless earbuds, over-ear headphones, and trending audio accessories from top brands." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the earbud supplier list with all future updates." },
    ]}
  />
);

export default ProductEarbuds;
