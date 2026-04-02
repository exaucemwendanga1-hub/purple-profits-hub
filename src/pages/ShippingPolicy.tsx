import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ShippingPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> April 2, 2026</p>
        <p>All products sold by 2SauceLLC are digital and delivered instantly after purchase.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">1. Digital Delivery</h2>
        <p>Upon successful payment, you will receive immediate access to your purchased digital products via email and/or your account.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">2. Delivery Timeframe</h2>
        <p>Digital products are typically delivered within minutes of purchase. If you do not receive your product within 1 hour, please contact us.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">3. No Physical Shipping</h2>
        <p>We do not ship physical products. All items are delivered digitally and no physical shipping address is required.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">4. Worldwide Access</h2>
        <p>Our digital products are available worldwide. There are no geographic restrictions on delivery.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">5. Contact</h2>
        <p>If you experience any issues with delivery, contact us via text at <a href="sms:+16399949261" className="text-primary hover:underline">(639) 994-9261</a>.</p>
      </div>
    </div>
  </div>
);

export default ShippingPolicy;
