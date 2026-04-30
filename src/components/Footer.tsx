import { MapPin, Clock } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import logo from "../assets/althix-logo.png";
import lazadaLogo from "../assets/lazada.png";
import instagramLogo from "../assets/instagram.png";
import facebookLogo from "../assets/facebook.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-muted/20">
      <div className="container mx-auto px-4">

        {/* 4 Equal Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-8 items-start">

          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <img 
              src={logo} 
              alt="Althixtron Logo" 
              className="h-[50px] w-[110px]" 
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Althixtron Electronics Supply and Services Inc. — your trusted partner for all electronics needs in Lucena City, Quezon.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm">Quick Links</h4>
            <a href="#services" className="text-sm text-muted-foreground hover:text-primary">Services</a>
            <a href="#why-us" className="text-sm text-muted-foreground hover:text-primary">Why Us</a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-primary">Gallery</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm">Follow Us</h4>

            {/* Facebook */}  
            <a 
              href="https://www.facebook.com/althixtronelectronics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground group transition-all hover:text-primary"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md group-hover:scale-110 transition">
                <img src={facebookLogo} alt="Facebook" className="w-full h-full object-contain rounded-md" />
              </div>
              Facebook
            </a>

            {/* Instagram */}  
            <a 
              href="https://www.instagram.com/althixtron.store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground group transition-all hover:text-primary"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md group-hover:scale-110 transition">
                <img src={instagramLogo} alt="Instagram" className="w-full h-full object-contain rounded-md" />
              </div>
              Instagram
            </a>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm">Our Stores</h4>

            {/* Lazada */}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground group transition-all hover:text-primary"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md group-hover:scale-110 transition">
                <img src={lazadaLogo} alt="Lazada" className="w-full h-full object-contain rounded-md" />
              </div>
              Lazada
            </a>

            {/* Shopee */}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground group transition-all hover:text-primary"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#EE4D2D] text-white group-hover:scale-110 transition">
                <SiShopee className="text-[14px]" />
              </div>
              Shopee
            </a>

            {/* TikTok */}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground group transition-all hover:text-primary"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-black text-white group-hover:scale-110 transition">
                <FaTiktok className="text-[14px]" />
              </div>
              TikTok Shop
            </a>
          </div>

        </div>

        {/* Contact Info FULL WIDTH BELOW */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">

          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>0485 ME, 01A Maharlika Hwy, Lucena City, 4301 Quezon</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Mon–Fri 8AM–5PM</span>
            </div>
          </div>

          <div className="text-xs text-center md:text-right">
            © {new Date().getFullYear()} Althixtron Electronics Supply and Services Inc.
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;