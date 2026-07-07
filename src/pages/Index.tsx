import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LogoSlider from "@/components/LogoSlider";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedProductsSection />
      <LogoSlider />
      <ServicesSection />
      <WhyUsSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <MapSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
