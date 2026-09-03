import { motion } from 'framer-motion'
import { PhoneCall, Mail, Send, MessageSquare } from 'lucide-react'
import { sectionVariants } from './variants/sectionVariants'

export const ContactSection = () => {
  return (
    <motion.section 
      id="contacto"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: false }}
      variants={sectionVariants} 
      className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-20 bg-[#fffcf9]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Información de Contacto */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-4">

            <h2 className="font-bricolage font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#3e1916] leading-tight">
              ¿Tienes alguna <span className="text-[#e52537]">duda</span> o evento?
            </h2>

            <p className="text-[#3e1916]/80 text-base md:text-lg leading-relaxed">
              Queremos estar cerca de ti. Escríbenos para pedidos especiales, eventos empresariales, banquetes o fiestas de cumpleaños. ¡Hagamos tu día más dulce!
            </p>
          </div>

          {/* Tarjetas Informativas */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#3e1916]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#35ab9f]/15 flex items-center justify-center text-[#35ab9f] shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-[#3e1916]/60 uppercase font-bold tracking-wider">Llamanos al</p>
                <p className="font-extrabold text-lg text-[#3e1916]">+503 7536-0714</p>
              </div>
            </div>

            {/* <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#3e1916]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#fadb72] flex items-center justify-center text-[#3e1916] shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-[#3e1916]/60 uppercase font-bold tracking-wider">Correo Electrónico</p>
                <p className="font-bold text-base md:text-lg text-[#3e1916]">hola@heladeria.sv</p>
              </div>
            </div> */}

          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-7">
          <div className="bg-white border-4 border-white shadow-2xl shadow-[#3e1916]/10 p-6 md:p-10 rounded-3xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-[#35ab9f]" />
              <h3 className="font-bricolage font-bold text-xl text-[#3e1916]">Envíanos un mensaje</h3>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ej. María López" 
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3.5 text-base text-[#3e1916] placeholder-[#3e1916]/40 focus:outline-none focus:ring-2 focus:ring-[#35ab9f] focus:border-transparent transition-all" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    placeholder="correo@ejemplo.com" 
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3.5 text-base text-[#3e1916] placeholder-[#3e1916]/40 focus:outline-none focus:ring-2 focus:ring-[#35ab9f] focus:border-transparent transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                  Tipo de Consulta
                </label>
                <select className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3.5 text-base text-[#3e1916] focus:outline-none focus:ring-2 focus:ring-[#35ab9f] focus:border-transparent transition-all">
                  <option value="general">Consulta General</option>
                  <option value="evento">Reserva para Evento / Cumpleaños</option>
                  <option value="mayoreo">Pedido Especial o Mayoreo</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                  Mensaje
                </label>
                <textarea 
                  rows={4} 
                  placeholder="Cuéntanos los detalles de tu consulta..." 
                  className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3.5 text-base text-[#3e1916] placeholder-[#3e1916]/40 focus:outline-none focus:ring-2 focus:ring-[#35ab9f] focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full bg-[#e52537] hover:bg-[#c41e2e] text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-[#e52537]/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensaje</span>
              </motion.button>
            </form>
          </div>
        </div>

      </div>
    </motion.section>
  )
}