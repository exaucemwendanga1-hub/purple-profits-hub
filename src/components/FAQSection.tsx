import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How much do the suppliers charge for a product?", a: "Prices range from $10–$200 depending on the product category. You'll find detailed pricing in each supplier list." },
  { q: "How fast is shipping?", a: "Shipping from suppliers typically takes 3–10 business days depending on location and product. Many suppliers also offer express options." },
  { q: "Is this beginner friendly?", a: "Absolutely! Each supplier list comes with step-by-step instructions, direct links, and contact info. No prior experience needed." },
  { q: "What does buying a supplier get me?", a: "You get instant access to trusted, verified suppliers offering products at competitive wholesale prices. Each list includes direct links, contact info, and product catalogs." },
  { q: "How will I receive access?", a: "Instantly! After purchase, you'll receive access via email with a download link. No waiting required." },
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
