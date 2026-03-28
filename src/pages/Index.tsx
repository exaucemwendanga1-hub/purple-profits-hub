import TickerBanner from "@/components/TickerBanner";
import CountdownBar from "@/components/CountdownBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import FeaturedCard from "@/components/FeaturedCard";
import ProductGrid from "@/components/ProductGrid";
import FAQSection from "@/components/FAQSection";
import ReviewsGrid from "@/components/ReviewsGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <TickerBanner />
    <CountdownBar />
    <Navbar />
    <HeroSection />
    <StatsRow />
    <FeaturedCard />
    <ProductGrid />
    <FAQSection />
    <ReviewsGrid />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
