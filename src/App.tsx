import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import ShippingPolicy from "./pages/ShippingPolicy.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import Auth from "./pages/Auth.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Account from "./pages/Account.tsx";
import Admin from "./pages/Admin.tsx";
import ProductBundle from "./pages/ProductBundle.tsx";
import ProductShoes from "./pages/ProductShoes.tsx";
import ProductWatch from "./pages/ProductWatch.tsx";
import ProductEarbuds from "./pages/ProductEarbuds.tsx";
import ProductCologne from "./pages/ProductCologne.tsx";
import ProductPuffer from "./pages/ProductPuffer.tsx";
import ProductLulu from "./pages/ProductLulu.tsx";
import ProductCrm from "./pages/ProductCrm.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bundle" element={<ProductBundle />} />
            <Route path="/product/shoes" element={<ProductShoes />} />
            <Route path="/product/watch" element={<ProductWatch />} />
            <Route path="/product/earbuds" element={<ProductEarbuds />} />
            <Route path="/product/cologne" element={<ProductCologne />} />
            <Route path="/product/puffer" element={<ProductPuffer />} />
            <Route path="/product/lulu" element={<ProductLulu />} />
            <Route path="/product/crm" element={<ProductCrm />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
