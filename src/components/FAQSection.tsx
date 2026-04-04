import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What are your business hours?",
    a: "We are open Monday to Saturday, 8:00 AM to 5:00 PM. We are closed on Sundays and holidays.",
  },
  {
    q: "Do you offer on-site services?",
    a: "Yes! We offer on-site CCTV installation, network setup, and IT consultation. Contact us for scheduling.",
  },
  {
    q: "How long does a typical computer repair take?",
    a: "Most software repairs are done same-day. Hardware repairs usually take 24–48 hours depending on parts availability.",
  },
  {
    q: "Do you sell computer parts and accessories?",
    a: "Absolutely. We carry a wide range of computer accessories including keyboards, mice, cables, drives, and more.",
  },
  {
    q: "Is there a warranty on your services?",
    a: "Yes, all our repair services come with a service warranty. Duration varies by service type — ask our team for details.",
  },
  {
    q: "Where exactly are you located?",
    a: "We're at 0485 ME, 01A Maharlika Highway, Lucena City, 4301 Quezon. Easy to find with street parking available.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Questions?</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem value={`faq-${i}`} className="glass rounded-xl px-6 border-none">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
