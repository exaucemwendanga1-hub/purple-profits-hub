import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollTo = () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-radial-purple" />
      <div className="absolute inset-0 bg-radial-purple opacity-50 animate-pulse" />
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl leading-none mb-6 text-foreground">
          receive instant access to<br />
          <span className="text-8xl font-extrabold text-[#715ccc] drop-shadow-[0_0_25px_rgba(113,92,204,0.8)] drop-shadow-[0_0_50px_rgba(113,92,204,0.4)]">top quality suppliers!</span>
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Premium supplier lists at unbeatable prices. Start your journey today with trusted, varified sources.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/bundle" className="bg-primary hover:bg-primary-light text-primary-foreground px-10 py-4 rounded-full font-semibold text-lg transition-all glow-neon hover:scale-105">
            🔥 Get the All Supplier Bundle — $25.99
          </Link>
          <button onClick={scrollTo} className="border border-primary/50 text-primary-light hover:bg-primary/10 px-10 py-4 rounded-full font-semibold text-lg transition-all">
            Browse Lists →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
