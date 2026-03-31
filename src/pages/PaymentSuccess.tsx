import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h1 className="font-heading text-3xl text-foreground mb-4">Payment Successful!</h1>
      <p className="text-muted-foreground mb-8">
        Thank you for your purchase. You'll receive an email with your supplier list shortly.
      </p>
      <Link
        to="/"
        className="bg-primary hover:bg-primary-light text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

export default PaymentSuccess;
