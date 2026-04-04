import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to Fix Your <span className="text-gradient">Tech Problems</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Don't let tech issues slow you down. Visit our store or give us a call — we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:09918684104"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-base glow-md hover:glow-lg transition-all"
            >
              <Phone className="h-5 w-5" />
              Call 0991 868 4104
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-primary text-primary font-bold text-base hover:bg-primary/10 transition-colors"
            >
              Send a Message
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
