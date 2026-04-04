import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const MapSection = () => {
  return (
    <section id="location" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Find Us
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            Visit Our <span className="text-gradient">Store</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 flex flex-col justify-center gap-6"
          >
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-display font-bold text-sm mb-1">Address</p>
                <p className="text-sm text-muted-foreground">
                  0485 ME, 01A Maharlika Hwy, Lucena City, 4301 Quezon
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-display font-bold text-sm mb-1">Phone</p>
                <a href="tel:09918684104" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  0991 868 4104
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-display font-bold text-sm mb-1">Hours</p>
                <p className="text-sm text-muted-foreground">Mon–Sat 8AM–5PM</p>
                <p className="text-xs text-muted-foreground">Closed on Sundays</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-border glow-sm"
          >
            <iframe
              title="Althixtron Location"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d532.1372728472868!2d121.60619905659546!3d13.934059761959867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDU2JzAzLjYiTiAxMjHCsDM2JzIyLjciRQ!5e1!3m2!1sen!2sph!4v1775172734604!5m2!1sen!2sph"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
