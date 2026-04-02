import TickerBanner from "@/components/TickerBanner";
import CountdownBar from "@/components/CountdownBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import ProofSection from "@/components/ProofSection";
import ProductGrid from "@/components/ProductGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewsGrid from "@/components/ReviewsGrid";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <TickerBanner />
    <CountdownBar />
    <Navbar />
    <HeroSection />
    <StatsRow />
    <ProofSection />
    <ProductGrid />
    <WhyChooseUs />
    <ReviewsGrid />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
