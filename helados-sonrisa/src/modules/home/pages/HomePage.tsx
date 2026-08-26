import { LocationSection } from '../components/LocationSection';
import { ContactSection } from '../components/ContactSection';
import { BentoSection } from '../components/BentoSection';
import { AboutSection } from '../components/AboutSection';
import { HeroSection } from '../components/HeroSection';
import { NavComponent } from '../../../components/global/NavComponent';
import { FooterComponent } from '../../../components/global/FooterComponent';


export const HeladosSonrisaLanding = () => {
  return (
    <div className="min-h-screen bg-[#fffcf9] font-['Poppins',sans-serif] text-[#2b100e] overflow-x-clip selection:bg-[#35ab9f] selection:text-white">
      
      {/* 1. HEADER / NAVIGATION BAR */}
      <NavComponent />

      {/* 2. HERO SECTION */}
      <HeroSection />

      <AboutSection />

      {/* 4. "NUESTRAS DELICIAS" BENTO GRID SECTION */}
      <BentoSection />

      {/* 5. INTERACTIVE LOCATION BLOCK */}
      <LocationSection />

      {/* 6. CONTACT FORM SECTION */}
      <ContactSection />

      {/* 7. FOOTER */}
      <FooterComponent />

    </div>
  );
}