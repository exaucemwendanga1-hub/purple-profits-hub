const HeroSection = () => {
  const scrollTo = () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-radial-purple" />
      <div className="absolute inset-0 bg-radial-purple opacity-50 animate-pulse" />
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl leading-none mb-6 text-foreground">
          Start Making Money With<br /><span className="text-gradient-purple">Viral Products</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Access winning products and suppliers instantly
        </p>
        <button onClick={scrollTo} className="bg-primary hover:bg-primary-light text-primary-foreground px-10 py-4 rounded-full font-semibold text-lg transition-all glow-purple hover:scale-105">
          Start Now →
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
