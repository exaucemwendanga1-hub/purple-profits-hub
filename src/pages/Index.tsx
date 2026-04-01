import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import ProductGrid from "@/components/ProductGrid";
import FAQSection from "@/components/FAQSection";
import ProofSection from "@/components/ProofSection";
import ReviewsGrid from "@/components/ReviewsGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <StatsRow />
    <ProductGrid />
    <ProofSection />
    <FAQSection />
    <ReviewsGrid />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
