import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { useNavigate } from 'react-router'
import { containerStaggerVariants, fadeInVariants } from './variants/variants'
import { menuData } from '../mocks/MenuMock'
import { obtenerImagenProducto } from '../mocks/productCatalog'

// Arreglo de colores pasteles llamativos basados en tu paleta para darle dinamismo a las tarjetas
const cardBackgrounds = [
    'bg-[#e2f8f5]', // Turquesa muy sutil
    'bg-[#eaf4f1]', // Menta suave
    'bg-[#fdf0ec]', // Durazno suave
    'bg-[#f4ecfd]', // Lila suave
    'bg-[#e8f1fc]'  // Azul pastel
]

export const PremiumLineSection = () => {
    const navigate = useNavigate()
    const premiumItems = menuData.menu.helados.filter((item) => item.categoria === 'Premium')

    return (
        <section id="premium" className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
            <div className="flex items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#35ab9f]">Sabores frutales</span>
                    <h2 className="font-bricolage font-bold text-3xl md:text-4xl text-[#2b100e] mt-2">
                        Línea <span className="text-[#35ab9f]">Premium</span>
                    </h2>
                </div>
                <span className="hidden sm:block text-sm font-medium text-[#555b5a] bg-white px-4 py-2 rounded-full shadow-xs border border-[#3e1916]/5">
                    {premiumItems.length} sabores artesanales
                </span>
            </div>

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: false }}
                variants={containerStaggerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            >
                {premiumItems.map((item, index) => {
                    // Asignamos un color de fondo dinámico y cíclico basado en la referencia visual
                    const bgClass = cardBackgrounds[index % cardBackgrounds.length]

                    return (
                        <motion.button 
                            type="button" 
                            onClick={() => navigate(`/products/detail/${item.id}`)} 
                            key={item.id} 
                            variants={fadeInVariants} 
                            className={`${bgClass} rounded-3xl p-5 border border-[#3e1916]/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left group cursor-pointer relative flex flex-col justify-between`}
                        >
                            {/* Botón flotante de favorito (inspirado en la referencia) */}
                            <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#2b100e] shadow-xs hover:bg-white hover:scale-110 transition-all">
                                <Heart className="w-4 h-4" />
                            </div>

                            <div>
                                {/* Contenedor de la imagen con efecto limpio */}
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white/50 shadow-inner">
                                    <img 
                                        src={obtenerImagenProducto(item.id)} 
                                        alt={item.nombre} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>

                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1b7a73] bg-white/60 px-2.5 py-1 rounded-md">
                                    {item.categoria}
                                </span>
                                <h3 className="font-bold text-lg text-[#2b100e] mt-2 group-hover:text-[#35ab9f] transition-colors">
                                    {item.nombre}
                                </h3>
                                <p className="text-xs text-[#555b5a] mt-1.5 line-clamp-2 leading-relaxed">
                                    {item.descripcion}
                                </p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-[#3e1916]/5 flex items-center justify-between">
                                <span className="text-xs font-bold text-[#2b100e]">Artesanal</span>
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#35ab9f] group-hover:translate-x-1 transition-transform">
                                    Ver detalle <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </motion.button>
                    )
                })}
            </motion.div>
        </section>
    )
}