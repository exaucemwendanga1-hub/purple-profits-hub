import proof1 from "@/assets/proof-1.jpg";
import proof2 from "@/assets/proof-2.jpg";
import proof3 from "@/assets/proof-3.jpg";

const proofImages = [
  { label: "Store Revenue Dashboard", src: proof1 },
  { label: "Sales Notifications", src: proof2 },
  { label: "Customer Reviews", src: proof3 },
];

const ProofSection = () => (
  <section className="py-16 px-4">
    <h2 className="font-heading text-3xl md:text-5xl text-center text-foreground mb-10">
      Proof It's Not That Hard...
    </h2>
    <div className="flex overflow-x-auto gap-5 pb-4 max-w-5xl mx-auto snap-x scrollbar-hide">
      {proofImages.map((img, i) => (
        <div
          key={i}
          className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:glow-purple-sm"
        >
          <img
            src={img.src}
            alt={img.label}
            className="w-full h-[200px] object-cover"
            loading="lazy"
            width={768}
            height={512}
          />
          <div className="p-4 text-center">
            <span className="text-muted-foreground text-sm">{img.label}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProofSection;
