import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Cable,
  Server,
  Sun,
  Flame,
  Speaker,
  Camera,
  Globe,
  Settings,
  AirVent,
} from "lucide-react";

type SolutionItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const services: SolutionItem[] = [
  {
    icon: Cable,
    title: "Structured Cabling",
    desc: "Cat6, fiber optic, patch panel, and clean network cabling installations.",
  },
  {
    icon: Server,
    title: "Data & Network Infrastructure",
    desc: "Enterprise network design, server rooms, command centers, and ICT deployment.",
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    desc: "Professional installation of CCTV systems including camera setup, wiring, configuration, and remote monitoring.",
  },
  {
    icon: Sun,
    title: "Solar Installation",
    desc: "Complete solar power system installation including panels, inverters, batteries, and system integration.",
  },
  {
    icon: AirVent,
    title: "Air-Conditioning Services",
    desc: "Supply, installation, repair, preventive maintenance, and cleaning.",
  },
  {
    icon: Flame,
    title: "FDAS",
    desc: "Fire Detection & Alarm System installation, maintenance, and compliance.",
  },
  {
    icon: Speaker,
    title: "Audio & Video Systems",
    desc: "PA systems, conference rooms, multimedia, and AV integration.",
  },
  {
    icon: Globe,
    title: "ICT Solutions",
    desc: "Wi-Fi setup, cloud systems, network security, and IT support.",
  },
  {
    icon: Settings,
    title: "Computer Repair & Maintenance",
    desc: "Diagnostics, upgrades, repairs, virus removal, and preventive servicing.",
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
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            What We Offer
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            Our <span className="text-gradient">Services</span>
          </h2>
        </motion.div>

        <SectionBlock title="Services" items={services} />
      </div>
    </section>
  );
};

type SectionBlockProps = {
  title: string;
  items: SolutionItem[];
};

function SectionBlock({ title, items }: SectionBlockProps) {
  return (
    <>
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {title}
        </h3>
        <div className="mx-auto mt-3 h-[2px] w-16 rounded-full bg-primary"></div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass rounded-2xl p-8 hover:glow-sm transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-7 w-7 text-primary" />
              </div>

              <h4 className="font-display text-lg font-bold mb-2">
                {item.title}
              </h4>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

export default ServicesSection;