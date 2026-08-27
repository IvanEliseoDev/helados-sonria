import { motion } from 'framer-motion'
import { Sparkles, Flame, Heart, Sun, ArrowUpRight } from 'lucide-react'

export const BentoSection = () => {
  return (
    <motion.section 
      id="delicias"
      className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-24 bg-[#fffcf9]"
    >
      {/* Encabezado Principal */}
      <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
       

        <h2 className="font-bricolage font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#3e1916]">
          Nuestras <span className="text-[#e52537]">Delicias</span> Artesanales
        </h2>
        
        <p className="text-[#3e1916]/80 text-base md:text-lg leading-relaxed font-normal">
          Explora una explosión de sabores únicos y refrescantes preparados diariamente en El Cafetalón. Desde clásicos cremosos hasta especialidades exóticas de nuestra tierra.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[320px]">
        
        {/* Item 1: Paletas Frutales (2 Columnas) */}
        <motion.div 
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group bg-[#3e1916]"
        >
          <img 
            src="https://i.ibb.co/8Dbv9sK0/image.png" 
            alt="Paletas Frutales" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e1916]/95 via-[#3e1916]/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white pointer-events-none">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-[#fadb72] text-[#3e1916] text-xs font-bold px-3 py-1 rounded-full mb-2">
                  <Sun className="w-3.5 h-3.5 text-[#e52537]" /> 100% Pulpa Natural
                </span>
                <h3 className="font-bricolage font-bold text-2xl md:text-3xl text-white">Paletas Frutales</h3>
                <p className="text-sm md:text-base text-white/90 font-normal mt-1 max-w-md">
                  Fruta congelada al momento en su punto exacto de dulzura natural.
                </p>
              </div>
              <div className="hidden sm:flex bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Item 2: Helados Artesanales (2 Filas de Alto) */}
        <motion.div 
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="md:row-span-2 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group bg-[#3e1916]"
        >
          <img 
            src="https://i.ibb.co/N6yWp3S3/image.png" 
            alt="Helados Artesanales" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e1916]/95 via-[#3e1916]/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white pointer-events-none">
            <span className="inline-flex items-center gap-1.5 self-start mb-3 bg-[#e52537] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              <Flame className="w-3.5 h-3.5 fill-white" /> El Favorito de Todos
            </span>
            <h3 className="font-bricolage font-bold text-2xl md:text-3xl text-white">Helados Artesanales</h3>
            <p className="text-sm text-white/90 font-normal mt-2 leading-relaxed">
              Cremosidad excepcional preparada diariamente con lácteos y toppings locales seleccionados.
            </p>
          </div>
        </motion.div>

        {/* Item 3: Sorbetes Artesanales */}
        <motion.div 
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group bg-[#3e1916]"
        >
          <img 
            src="https://i.ibb.co/7tmFmrJ4/image.png" 
            alt="Sorbetes Artesanales" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e1916]/95 via-[#3e1916]/40 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
            <span className="inline-flex items-center gap-1.5 self-start mb-2 bg-[#35ab9f] text-white text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Opción Fresca
            </span>
            <h3 className="font-bricolage font-bold text-xl md:text-2xl text-white">Sorbetes Tradicionales</h3>
            <p className="text-xs md:text-sm text-white/90 font-normal mt-1">
              Texturas ligeras y refrescantes con el auténtico sabor salvadoreño.
            </p>
          </div>
        </motion.div>

        {/* Item 4: Minutas Gourmet */}
        <motion.div 
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group bg-[#3e1916]"
        >
          <img 
            src="https://i.ibb.co/9mX1vcM3/image.png" 
            alt="Minutas Salvadoreñas" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e1916]/95 via-[#3e1916]/40 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
            <span className="inline-flex items-center gap-1.5 self-start mb-2 bg-[#e52537] text-white text-xs font-bold px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 fill-white" /> Receta de la Casa
            </span>
            <h3 className="font-bricolage font-bold text-xl md:text-2xl text-white">Minutas Gourmet</h3>
            <p className="text-xs md:text-sm text-white/90 font-normal mt-1">
              Jarabe artesanal hecho desde cero con fruta real e ingredientes de calidad.
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  )
}