import TickerBanner from "@/components/TickerBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsRow from "@/components/StatsRow";
import ProductGrid from "@/components/ProductGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewsGrid from "@/components/ReviewsGrid";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => (
  <div className="min-h-screen bg-background">
    <TickerBanner />
    <Navbar />
    <HeroSection />
    <StatsRow />
    <ProductGrid />
    <FAQSection />
    <ReviewsGrid />
    <WhyChooseUs />
    <NewsletterSignup />
    <CTASection />
    <Footer />
    <ChatWidget />
  </div>
);

export default Index;
