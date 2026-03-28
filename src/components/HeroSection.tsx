const HeroSection = () => {
  const scrollTo = () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-radial-purple" />
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl leading-none mb-6 text-foreground">
          Get Instant Access to the<br /><span className="text-gradient-purple">Best Suppliers!</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Premium supplier lists at unbeatable prices. Start your reselling journey today with trusted, verified sources.
        </p>
        <button onClick={scrollTo} className="bg-primary hover:bg-primary-light text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all glow-purple hover:scale-105">
          View All Products →
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
