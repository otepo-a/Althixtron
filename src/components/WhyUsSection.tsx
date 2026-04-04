import { motion } from "framer-motion";
import { CheckCircle2, Award, Clock, Users, ThumbsUp, MapPin } from "lucide-react";

const reasons = [
  { icon: Award, title: "Certified Technicians", desc: "Skilled professionals with years of experience in electronics repair and IT services." },
  { icon: Clock, title: "Fast Turnaround", desc: "Most repairs completed within 24–48 hours. We respect your time." },
  { icon: ThumbsUp, title: "Quality Guaranteed", desc: "We use genuine parts and stand behind every repair with a service warranty." },
  { icon: Users, title: "Trusted by Hundreds", desc: "Serving Lucena City and the Quezon Province with a growing base of loyal customers." },
  { icon: MapPin, title: "Convenient Location", desc: "Easy to find along Maharlika Highway." },
  { icon: CheckCircle2, title: "Affordable Pricing", desc: "Competitive rates without compromising on quality. Free diagnosis for walk-ins." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            The Althixtron <span className="text-gradient">Advantage</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <r.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold mb-1">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
