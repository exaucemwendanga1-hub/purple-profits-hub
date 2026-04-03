const CTASection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 bg-radial-purple" />
    <div className="relative container mx-auto px-4 text-center">
      <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">Start Today</h2>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
        Join thousands of successful resellers. Get instant access now.
      </p>
      <button
        onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-primary hover:bg-primary-light text-primary-foreground px-10 py-4 rounded-full font-semibold text-lg transition-all glow-neon hover:scale-105"
      >
        Get Started Now →
      </button>
    </div>
  </section>
);

export default CTASection;
