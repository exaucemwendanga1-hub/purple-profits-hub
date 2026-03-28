const CTASection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 bg-radial-purple" />
    <div className="relative container mx-auto px-4 text-center">
      <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">Start Making Money Today</h2>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
        Join thousands of successful resellers. Get instant access to premium supplier lists at unbeatable prices.
      </p>
      <button
        onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-primary hover:bg-primary-light text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all glow-purple hover:scale-105"
      >
        View All Products →
      </button>
    </div>
  </section>
);

export default CTASection;
