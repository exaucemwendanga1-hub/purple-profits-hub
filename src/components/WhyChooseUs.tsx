import { BookOpen, TrendingUp, ShieldCheck } from "lucide-react";

const items = [
  { icon: BookOpen, title: "Beginner Friendly", desc: "Step-by-step guides included with every supplier list." },
  { icon: TrendingUp, title: "Fast Profits", desc: "Start earning within days, not months." },
  { icon: ShieldCheck, title: "Trusted Suppliers", desc: "Every supplier is verified and vetted for quality." },
];

const WhyChooseUs = () => (
  <section className="container mx-auto px-4 py-20">
    <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-14">Why Choose Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {items.map((item) => (
        <div key={item.title} className="bg-card border border-border rounded-2xl p-8 text-center transition-all duration-300 hover:border-primary/50 hover:glow-purple-sm">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
            <item.icon className="w-7 h-7 text-primary-light" />
          </div>
          <h3 className="text-foreground font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
