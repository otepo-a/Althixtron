import { motion } from "framer-motion";
import { Monitor, Wifi, Shield, Printer, HardDrive, Wrench, Cable, Radio, Server, Sun, Flame, Speaker, Camera, Globe, FileCode, Settings } from "lucide-react";

const services = [
  {
    icon: Cable,
    title: "Structured Cabling",
    desc: "Professional structured cabling solutions for commercial and residential buildings — Cat6, fiber optic, and patch panel installations.",
  },
  {
    icon: Radio,
    title: "Two-Way Radio Systems",
    desc: "Reliable two-way radio communication systems for businesses, security teams, and field operations.",
  },
  {
    icon: Server,
    title: "Data & Command Network Infrastructure",
    desc: "End-to-end data network design, command center setups, and enterprise-grade infrastructure deployment.",
  },
  {
    icon: Sun,
    title: "Solar Technology",
    desc: "Solar panel installation, inverter setup, and sustainable energy solutions for homes and businesses.",
  },
  {
    icon: Flame,
    title: "FDAS (Fire Detection & Alarm System)",
    desc: "Fire detection and alarm system installation, maintenance, and compliance — keeping your property safe.",
  },
  {
    icon: Speaker,
    title: "Audio & Video Systems",
    desc: "Professional AV installations — PA systems, conference rooms, home theaters, and multimedia setups.",
  },
  {
    icon: Camera,
    title: "CCTV & Security Systems",
    desc: "Complete surveillance solutions — IP cameras, DVR/NVR setup, remote viewing, and access control.",
  },
  {
    icon: Globe,
    title: "Network & ICT Solutions",
    desc: "LAN/Wi-Fi setup, network security, cloud integration, and full ICT infrastructure management.",
  },
  {
    icon: FileCode,
    title: "Software & Licenses",
    desc: "Licensed software supply — OS, office suites, antivirus, and enterprise software procurement.",
  },
  {
    icon: Settings,
    title: "Computer Supply, Services & Maintenance",
    desc: "Computer sales, repair, diagnostics, hardware upgrades, virus removal, and preventive maintenance.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            Our <span className="text-gradient">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8 hover:glow-sm transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
