import proof1 from "@/assets/proof-1.jpg";
import proof2 from "@/assets/proof-2.jpg";
import proof3 from "@/assets/proof-3.jpg";

const proofImages = [
  { label: "Store Revenue Dashboard", src: proof1 },
  { label: "Sales Notifications", src: proof2 },
  { label: "Customer Reviews", src: proof3 },
  { label: "Store Revenue Dashboard", src: proof1 },
  { label: "Sales Notifications", src: proof2 },
  { label: "Customer Reviews", src: proof3 },
];

const ProofSection = () => (
  <section className="py-16 px-4 overflow-hidden">
    <h2 className="font-heading text-3xl md:text-5xl text-center text-foreground mb-10">
      Proof It's Not That Hard...
    </h2>
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex gap-5 animate-[scroll_20s_linear_infinite] w-max">
        {proofImages.map((img, i) => (
          <div
            key={i}
            className="min-w-[280px] md:min-w-[320px] flex-shrink-0 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:glow-purple-sm hover:[animation-play-state:paused]"
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
    </div>
  </section>
);

export default ProofSection;
