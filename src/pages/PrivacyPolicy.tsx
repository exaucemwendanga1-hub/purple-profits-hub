import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p><strong className="text-foreground">Last updated:</strong> April 2, 2026</p>
        <p>2SauceLLC respects your privacy and is committed to protecting the personal information you share with us.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
        <p>We may collect your name, email address, phone number, and payment information when you make a purchase.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
        <p>Your information is used to process orders, deliver digital products, and communicate with you about your purchase.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Sharing</h2>
        <p>We do not sell or share your personal data with third parties, except as required to process payments or comply with legal obligations.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">5. Cookies</h2>
        <p>Our website may use cookies to improve your browsing experience. You can disable cookies in your browser settings.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">6. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by contacting us.</p>
        <h2 className="text-xl font-semibold text-foreground mt-8">7. Contact</h2>
        <p>For privacy inquiries, contact us via text at <a href="sms:+16399949261" className="text-primary hover:underline">(639) 994-9261</a>.</p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
