import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> April 2, 2026</p>
        <p>Welcome to 2SauceLLC. By accessing or using our website and services, you agree to be bound by the following terms and conditions.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
        <p>By placing an order or using our services, you confirm that you have read, understood, and agree to these Terms of Service.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">2. Products & Services</h2>
        <p>We provide digital products and supplier lists for reselling purposes. All sales are final once the digital product has been delivered.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">3. User Responsibilities</h2>
        <p>You agree to use our products lawfully and not to redistribute, resell, or share the digital content without authorization.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">4. Intellectual Property</h2>
        <p>All content, branding, and materials on this site are the property of 2SauceLLC and may not be reproduced without written consent.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">5. Limitation of Liability</h2>
        <p>2SauceLLC is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">6. Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of any modifications.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">7. Contact</h2>
        <p>For questions regarding these terms, please contact us via text at <a href="sms:+16399949261" className="text-primary hover:underline">(639) 994-9261</a>.</p>
      </div>
    </div>
  </div>
);

export default TermsOfService;
