const reviews = [
  { name: "Jake S.", text: "Best supplier list I've ever bought. Made my money back in the first week!" },
  { name: "Alex A.", text: "Instant access and amazing quality. The shoe suppliers are incredible." },
  { name: "Ryan R.", text: "I was skeptical at first but these suppliers are legit. Highly recommend!" },
  { name: "Noah N.", text: "Great value for money. The ultimate pack is a no-brainer at this price." },
  { name: "Liam L.", text: "Customer support is top notch and the suppliers deliver fast." },
  { name: "Ethan G.", text: "Been reselling for 2 years and this is the best resource I've found." },
  { name: "Owen K.", text: "The jewelry suppliers alone are worth 10x the price. Amazing!" },
  { name: "Henry M.", text: "Quick delivery, verified suppliers, and great prices. What more could you want?" },
];

const ReviewsGrid = () => (
  <section className="container mx-auto px-4 py-16">
    <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-12">What Our Customers Say</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {reviews.map((r) => (
        <div key={r.name} className="bg-card border border-border rounded-xl p-6 hover:-translate-y-1 hover:border-primary/50 transition-all">
          <div className="text-gold text-sm mb-3">★★★★★</div>
          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">"{r.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/30 flex items-center justify-center text-primary-light font-bold text-sm">
              {r.name[0]}
            </div>
            <div>
              <div className="text-foreground text-sm font-semibold">{r.name}</div>
              <div className="text-muted-foreground text-xs">Feb 2026</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ReviewsGrid;
