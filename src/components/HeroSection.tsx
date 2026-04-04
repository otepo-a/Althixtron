import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="contact" className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Electronics workshop" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>

      <div className="container relative mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
            Lucena City's Trusted Tech Partner
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Your One-Stop{" "}
            <span className="text-gradient">Electronics</span>{" "}
            Supply &amp; Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-8">
            From computer accessories to full IT solutions — Althixtron delivers quality products and expert repair services in Quezon Province.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="#contact-form" className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-base glow-md hover:glow-lg transition-all text-center">
              Contact Us Today
            </a>
            <a href="#services" className="px-8 py-4 rounded-lg border border-border text-foreground font-semibold text-base hover:bg-secondary transition-colors text-center">
              Our Services
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>0991 868 4104</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs">01A Maharlika Hwy, Lucena City, 4301 Quezon Province</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Mon–Fri 8AM–5PM</span>
            </div>
          </div>
        </motion.div>

        {/* Right — Contact Form */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass rounded-2xl p-8 glow-sm"
        >
          <h2 className="text-2xl font-display font-bold mb-2">Get a Free Quote</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Tell us what you need and we'll get back to you within 24 hours.
          </p>
          <form
            className="space-y-4"
            action="https://formsubmit.co/malundas23@gmail.com"
            method="POST"
          >
            {/* Optional settings */}
            <input type="hidden" name="_subject" value="New Website Inquiry - Althixtron" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Full Name</label>
              <input
                type="text"
                name="full_name"
                placeholder="Juan Dela Cruz"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Phone / Email</label>
              <input
                type="text"
                name="contact_info"
                placeholder="09XX XXX XXXX or email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Service Needed</label>
              <select
                name="service_needed"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                required
              >
                <option value="">Select a service</option>
                <option>Structured Cabling</option>
                <option>Two-Way Radio Systems</option>
                <option>Data & Command Network</option>
                <option>Solar Technology</option>
                <option>FDAS</option>
                <option>Audio & Video Systems</option>
                <option>CCTV & Security Systems</option>
                <option>Network & ICT Solutions</option>
                <option>Software & Licenses</option>
                <option>Computer Supply & Maintenance</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Message</label>
              <textarea
                rows={3}
                name="message"
                placeholder="Describe your needs..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-base glow-sm hover:glow-md transition-all"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
