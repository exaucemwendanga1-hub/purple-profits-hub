import { Shield, Zap, RefreshCw, Database } from "lucide-react";
import productCrm from "@/assets/product-crm.png";
import ProductPageLayout from "@/components/ProductPageLayout";

const ProductCrm = () => (
  <ProductPageLayout
    name="CRM Supplier List"
    price="$11.99"
    oldPrice="$19.99 CAD"
    discount="40%"
    priceId="price_1TIJ2oPkl9P0JJ5qfhrApxYP"
    image={productCrm}
    description="Premium CRM supplier list with verified quality and competitive pricing. Streamline your reselling operations with the best tools and contacts."
    features={[
      { icon: Database, title: "Organized Contacts", desc: "Access a curated CRM list to manage suppliers and streamline your business." },
      { icon: Zap, title: "Instant Digital Delivery", desc: "Get access immediately after purchase — no waiting." },
      { icon: RefreshCw, title: "Weekly Updates", desc: "New suppliers added regularly so you always have fresh sources." },
      { icon: Shield, title: "Verified & Trusted", desc: "Every supplier is vetted for quality, reliability, and pricing." },
    ]}
    includes={[
      "CRM Supplier Contacts",
      "Organized Database Format",
      "Communication Templates",
      "Best Practices Guide",
      "Supplier Management Tips",
      "Free Lifetime Updates",
    ]}
    faqs={[
      { q: "What is the CRM supplier list?", a: "It's a curated, organized list of supplier contacts designed to help you manage your reselling business more efficiently." },
      { q: "Are the suppliers verified?", a: "Yes — every supplier is manually vetted for quality, reliability, and competitive pricing." },
      { q: "How often are the lists updated?", a: "We update the lists weekly with new suppliers, and you get all future updates for free." },
      { q: "Can I get a refund?", a: "Due to the digital nature of this product, we offer refunds within 24 hours if you haven't downloaded the files." },
      { q: "Is this a one-time payment?", a: "Yes! Pay once and get lifetime access to the CRM supplier list with all future updates." },
    ]}
  />
);

export default ProductCrm;
