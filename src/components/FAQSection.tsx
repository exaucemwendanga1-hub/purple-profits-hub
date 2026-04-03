import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How much does it cost?", a: "Our supplier lists start at just $11.99. The all-in-one bundle is $25.99 — a fraction of what you'd pay elsewhere." },
  { q: "How fast do I get access?", a: "Instantly! After purchase, you'll receive access via email with a download link. No waiting required." },
  { q: "Is this legit?", a: "Absolutely! We have over 500+happy customers and a 5-star rating. Every supplier is verified and vetted." },
  { q: "How much do the suppliers charge for a product?", a: "Prices range from $10–$200 depending on the product category. You'll find detailed pricing in each supplier list." },
  { q: "Is this beginner friendly?", a: "Yes! Each supplier list comes with step-by-step instructions, direct links, and contact info. No prior experience needed." },
];

const FAQSection = () => (
  <section id="faq" className="container mx-auto px-4 py-16 max-w-3xl">
    <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-12">
      Frequently Asked Questions
    </h2>
    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((f, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="bg-card border border-border rounded-2xl px-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:glow-purple-sm"
        >
          <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline py-5">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-5">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQSection;
