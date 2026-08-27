
import { FooterComponent } from '../../../components/global/FooterComponent'
import { NavComponent } from '../../../components/global/NavComponent'
import { PremiumLineSection } from '../components/PremiumLineSection'
import { ProductsHero } from '../components/ProductsHero'
import { SpecialtiesSection } from '../components/SpecialtiesSection'
import { SuperPremiumSection } from '../components/SuperPremiumSection'

export const ProductsPage = () => {
    return (
      
        <div className="bg-[#fffcf9] font-['Poppins',sans-serif] text-[#3e1916] overflow-x-clip selection:bg-[#4bc0bc] selection:text-white">
        
          {/* Header / Navbar */}
         <NavComponent />
            {/* Contenido Principal Modular */}
            <main className="w-full overflow-x-clip">
                <ProductsHero />
                <PremiumLineSection />
                <SuperPremiumSection />
                <SpecialtiesSection />
                <FooterComponent />
            </main>
        </div>
    )
}
