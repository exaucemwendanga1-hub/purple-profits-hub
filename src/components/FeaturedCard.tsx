const FeaturedCard = () => (
  <section className="container mx-auto px-4 py-16">
    <div className="relative bg-card border-2 border-primary/40 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto glow-purple overflow-hidden">
      <div className="absolute top-4 right-4 flex gap-2">
        <span className="bg-sale text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">SALE</span>
        <span className="bg-gold text-background text-xs font-bold px-3 py-1 rounded-full">⭐ BEST DEAL</span>
      </div>
      <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-2">Ultimate Resellers Pack ⭐</h2>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-3xl font-bold text-primary-light">$34.99</span>
        <span className="text-muted-foreground line-through text-lg">$99.99</span>
        <span className="bg-primary/20 text-primary-light text-sm font-semibold px-3 py-1 rounded-full">Save 65%</span>
      </div>
      <p className="text-muted-foreground mb-8 max-w-lg">
        Get access to ALL supplier lists in one bundle. The ultimate package for serious resellers looking to maximize profits.
      </p>
      <div className="flex gap-4 flex-wrap">
        <button className="bg-primary hover:bg-primary-light text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all glow-purple-sm hover:glow-purple">
          Buy Now
        </button>
        <button className="border border-primary/50 text-primary-light hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold transition-all">
          Details +
        </button>
      </div>
    </div>
  </section>
);

export default FeaturedCard;
