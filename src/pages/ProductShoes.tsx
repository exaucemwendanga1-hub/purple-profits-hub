import { Shield, Zap, RefreshCw, TrendingUp } from "lucide-react";
import productShoes from "@/assets/product-shoes.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductShoes = () => (
  <ProductPageLayout
    name="Shoe Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    paymentLink="https://buy.stripe.com/7sY00i87ec1SbUg4Nu8Ra00"
    image={productShoes}
    description="Premium shoe suppliers for trending sneakers and designer footwear at wholesale prices. Get access to verified sources for the hottest kicks on the market."
    features={[
      { icon: TrendingUp, title: "Trending Styles", desc: "Access suppliers carrying the latest sneaker releases and designer footwear." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "Verified Sneaker Suppliers",
      "Designer Footwear Sources",
      "Wholesale Pricing Contacts",
      "Shipping & Logistics Info",
      "Quality Verification Guide",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What types of shoes are covered?", a: "Our list includes suppliers for trending sneakers, designer footwear, athletic shoes, and casual styles from top brands." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the shoe supplier list with all future updates." },
    ]}
  />
);

export default ProductShoes;
