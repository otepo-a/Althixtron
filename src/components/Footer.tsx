import { MapPin, Phone, Clock } from "lucide-react";
import logo from "../assets/althix-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Althixtron Logo" className="h-[50px] w-[100px]" width={32} height={32} loading="lazy" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Althixtron Electronics Supply and Services Inc. — your trusted partner for all electronics needs in Lucena City, Quezon.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#services" className="hover:text-primary transition-colors">Services</a>
              <a href="#why-us" className="hover:text-primary transition-colors">Why Us</a>
              <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
              <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-sm">Contact Info</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>0485 ME, 01A Maharlika Hwy, Lucena City, 4301 Quezon</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>0991 868 4104</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Mon–Fri 8AM–5PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Althixtron Electronics Supply and Services Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
