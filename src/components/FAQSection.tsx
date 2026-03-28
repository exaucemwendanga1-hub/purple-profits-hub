import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What does buying a supplier get me?", a: "You get instant access to trusted, verified suppliers offering products at competitive wholesale prices. Each supplier list includes direct links, contact info, and product catalogs." },
  { q: "How will I receive access?", a: "Instantly! After purchase, you'll receive access via email and on the order confirmation page. No waiting required." },
  { q: "How long does shipping take?", a: "Shipping from suppliers typically takes 3–10 business days depending on location and product." },
  { q: "Do suppliers ship worldwide?", a: "Yes, the vast majority of suppliers offer worldwide shipping, with some exceptions for certain regions." },
  { q: "How much do suppliers charge per product?", a: "Prices range from $10–$200 depending on the product category. You'll find detailed pricing in each supplier list." },
];

const FAQSection = () => (
  <section id="faq" className="container mx-auto px-4 py-16 max-w-3xl">
    <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-12">Frequently Asked Questions</h2>
    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 overflow-hidden">
          <AccordionTrigger className="text-foreground font-semibold text-left hover:no-underline py-5">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-5">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQSection;
