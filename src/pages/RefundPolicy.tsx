import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RefundPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> April 2, 2026</p>
        <p>Due to the digital nature of our products, all sales are generally final. However, we want you to be satisfied with your purchase.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">1. Refund Eligibility</h2>
        <p>Refunds may be considered on a case-by-case basis if you experience a technical issue preventing access to your purchased product.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">2. How to Request a Refund</h2>
        <p>To request a refund, contact us within 48 hours of purchase with your order details and a description of the issue.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">3. Non-Refundable Cases</h2>
        <p>Refunds will not be issued for change of mind, failure to use the product, or if the digital product has been accessed/downloaded.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">4. Processing Time</h2>
        <p>Approved refunds will be processed within 5–10 business days and returned to the original payment method.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">5. Contact</h2>
        <p>For refund requests, contact us via text at <a href="sms:+16399949261" className="text-primary hover:underline">(639) 994-9261</a>.</p>
      </div>
    </div>
  </div>
);

export default RefundPolicy;
