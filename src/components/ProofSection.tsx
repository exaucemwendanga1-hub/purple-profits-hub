const placeholders = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const ProofSection = () => (
  <section className="bg-background py-16 px-4">
    <h2 className="font-heading text-3xl md:text-4xl text-center text-foreground mb-8">
      Proof It's Not That Hard...
    </h2>
    <div className="flex overflow-x-auto gap-4 pb-4 max-w-4xl mx-auto snap-x">
      {placeholders.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Proof screenshot ${i + 1}`}
          className="w-[250px] flex-shrink-0 rounded-2xl border border-border snap-start"
        />
      ))}
    </div>
  </section>
);

export default ProofSection;
