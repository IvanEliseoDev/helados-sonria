import { sectionVariants } from './variants/sectionVariants'
import { motion } from 'framer-motion'

export const BentoSection = () => {
  return (
    <motion.section 
        id="delicias"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25, once: false }}
        variants={sectionVariants} 
        className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 py-28 bg-[#fffcf9]"
      >
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-bricolage font-bold text-4xl md:text-5xl text-[#006A67]">
            Nuestras Delicias
          </h2>
          <p className="text-[#727877] max-w-2xl mx-auto">
            Explora una explosión de sabores únicos y refrescantes hechos a mano todos los días. Desde clásicos cremosos hasta especialidades exóticas.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
          <div className="md:col-span-2 relative rounded-xl overflow-hidden shadow-lg group border border-[#3e1916]/5">
            <img src="https://i.ibb.co/8Dbv9sK0/image.png" alt="Paletas Frutales" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#35ab9f]/15 via-[#35ab9f]/10 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="font-bricolage font-bold text-2xl mb-1">Paletas Frutales</h3>
              <p className="text-sm text-white/80 font-light">100% pulpa natural congelada al momento.</p>
            </div>
          </div>

          <div className="md:row-span-2 relative rounded-xl overflow-hidden shadow-lg group border border-[#3e1916]/5">
            <img src="https://i.ibb.co/N6yWp3S3/image.png" alt="Helados Artesanales" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#35ab9f]/10 via-[#35ab9f]/5 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="self-start mb-2 bg-[#e52537] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Más Vendido
              </span>
              <h3 className="font-bricolage font-bold text-2xl mb-1">Helados Artesanales</h3>
              <p className="text-sm text-white/80 font-light">Cremosidad exceptional que derretirá tus sentidos.</p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg group border border-[#3e1916]/5">
            <img src="https://i.ibb.co/7tmFmrJ4/image.png" alt="Sorbetes Artesanales" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#35ab9f]/10 via-[#35ab9f]/5 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="font-bricolage font-bold text-xl mb-1">Sorbetes Artesanales</h3>
              <p className="text-xs text-white/80 font-light">Texturas ligeras y refrescantes sin lactosa.</p>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-lg group border border-[#3e1916]/5">
            <img src="https://i.ibb.co/9mX1vcM3/image.png" alt="Minutas Salvadoreñas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#35ab9f]/15 via-[#35ab9f]/10 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="font-bricolage font-bold text-xl mb-1">Minutas Gourmet</h3>
              <p className="text-xs text-white/80 font-light">El toque tradicional con jarabes preparados en casa.</p>
            </div>
          </div>
        </div>
      </motion.section>
  )
}
