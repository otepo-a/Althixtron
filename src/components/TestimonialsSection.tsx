import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Engr. Marco Reyes",
    role: "Building Contractor",
    stars: 5,
    quote:
      "Althixtron installed our FDAS and CCTV systems for a commercial building project. Professional team, on-time delivery, and excellent after-sales support.",
  },
  {
    name: "Maria Santos",
    role: "Small Business Owner",
    stars: 5,
    quote:
      "They set up our entire POS system and network. Every time we have an issue, their team responds fast. Highly recommended for any business in Lucena!",
  },
  {
    name: "Joel Mendoza",
    role: "IT Manager, LGU Office",
    stars: 5,
    quote:
      "We've been sourcing our computer supplies and structured cabling services from Althixtron for years. Consistent quality and very competitive pricing.",
  },
  {
    name: "Anna Lim",
    role: "Homeowner",
    stars: 4,
    quote:
      "Had my laptop repaired and bought a solar panel setup from them. Great advice, fair prices, and the solar installation was done perfectly.",
  },
  {
    name: "Carlos Villanueva",
    role: "Restaurant Owner",
    stars: 5,
    quote:
      "They did our audio-video system and security cameras. The quality of work is top-notch. Our go-to electronics partner in Quezon Province.",
  },
  {
    name: "Luz Aguilar",
    role: "School Administrator",
    stars: 5,
    quote:
      "Althixtron handled our school's ICT infrastructure upgrade — networking, software licenses, and computer maintenance. Very reliable and knowledgeable team.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex flex-col justify-between hover:glow-sm transition-all"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s < t.stars
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
