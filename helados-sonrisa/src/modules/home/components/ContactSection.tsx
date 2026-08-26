import { motion } from 'framer-motion'
import { sectionVariants } from './variants/sectionVariants'

export const ContactSection = () => {
  return (
    <motion.section 
        id="contacto"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: false }}
        variants={sectionVariants} 
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-24 pt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <h2 className="font-bricolage font-bold text-4xl md:text-6xl text-[#3e1916]">
            ¿Tienes alguna duda?
          </h2>
          <p className="text-base md:text-lg text-[#727877] leading-relaxed">
            Queremos escucharte de cerca. Si quieres hacer un pedido especial, eventos empresariales o fiestas de cumpleaños, déjanos un mensaje aquí.
          </p>
          
          <div className="flex items-center gap-4 text-base md:text-lg text-[#3e1916] font-medium pt-4">
            <div className="w-12 h-12 rounded-full bg-[#4bc0bc]/10 flex items-center justify-center text-[#4bc0bc] flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.557-5.273-4.002-6.83-6.83l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.75Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm text-[#727877] uppercase font-semibold tracking-wider">Llámanos</p>
              <p className="font-bold text-lg md:text-xl text-[#3e1916]">+503 2200-0000</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#3e1916]/10 p-6 md:p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                  Nombre
                </label>
                <input 
                  type="text" 
                  placeholder="Tu nombre" 
                  className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3.5 text-base md:text-lg focus:outline-none focus:border-[#4bc0bc] transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                  Correo
                </label>
                <input 
                  type="email" 
                  placeholder="correo@ejemplo.com" 
                  className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3.5 text-base md:text-lg focus:outline-none focus:border-[#4bc0bc] transition-colors" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                Mensaje
              </label>
              <textarea 
                rows={4} 
                placeholder="Escribe tu mensaje aquí..." 
                className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3.5 text-base md:text-lg focus:outline-none focus:border-[#4bc0bc] transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#e52537] hover:bg-[#c81e2e] text-white font-bold text-base md:text-lg py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
    </motion.section>
  )
}