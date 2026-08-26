import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sectionVariants } from './variants/sectionVariants'

export const AboutSection = () => {
    const [openTab, setOpenTab] = useState<'mision' | 'vision' | null>(null)

    const toggleTab = (tab: 'mision' | 'vision') => {
        setOpenTab(openTab === tab ? null : tab)
    }

    return (
        <div className="relative bg-[#4bc0bc] pt-28 pb-32 text-white">

            {/* Top Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180 leading-[0] z-10 -mt-1">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#fffcf9]"></path>
                </svg>
            </div>

            <motion.section
                id="nosotros"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: false }}
                variants={sectionVariants}
                className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-center"
            >
                {/* Contenedor de Imagen adaptado para no empujar o tapar contenido */}
                <div className="lg:col-span-5 relative group w-full max-w-md lg:max-w-none mx-auto">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-[#35ab9f]">
                        <img 
                            src="https://i.ibb.co/vxVLtRYN/image.png" 
                            alt="Nuestra tienda en El Cafetalón" 
                            className="w-full h-auto max-h-[500px] object-cover block" 
                        />
                    </div>
                    <div className="absolute -bottom-4 left-6 bg-[#e52537] text-white px-6 py-2.5 rounded-xl font-bold text-base shadow-lg">
                        Desde 2010
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="lg:col-span-7 space-y-8 text-left">
                    <div className="space-y-4">
                        <h2 className="font-bricolage font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
                            Artesanos del Sabor en El Cafetalón
                        </h2>
                        <p className="text-white/95 text-lg md:text-xl leading-relaxed font-light">
                            Nos apasiona transformar ingredientes frescos de El Salvador en experiencias cremosas e inolvidables. Todos los días preparamos lotes pequeños para garantizar la frescura absoluta que nos caracteriza en cada cucharada.
                        </p>
                    </div>

                    {/* Acordeón desplegable sin borde negro al hacer click */}
                    <div className="space-y-4 pt-2">
                        {/* Misión */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden transition-all">
                            <button
                                type="button"
                                onClick={() => toggleTab('mision')}
                                className="w-full p-5 md:p-6 flex justify-between items-center text-left font-bricolage font-bold text-xl md:text-2xl text-white hover:bg-white/5 focus:outline-none cursor-pointer transition-colors"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-[#3e1916] bg-white/20 px-3.5 py-1 rounded-xl text-base">🎯</span>
                                    Nuestra Misión
                                </span>
                                <span className={`transform transition-transform duration-300 text-2xl ${openTab === 'mision' ? 'rotate-180' : ''}`}>
                                    ▾
                                </span>
                            </button>

                            <AnimatePresence>
                                {openTab === 'mision' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-2 text-base md:text-lg text-white/95 leading-relaxed border-t border-white/10">
                                            Compartir e inspirar sonrisas, brindando helados artesanales de la más alta calidad, utilizando ingredientes naturales y frescos para ofrecer a nuestros clientes una experiencia de sabor inolvidable. Nuestra misión es crear un espacio acogedor donde cada visita se convierta en una aventura dulce y memorable.
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Visión */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden transition-all">
                            <button
                                type="button"
                                onClick={() => toggleTab('vision')}
                                className="w-full p-5 md:p-6 flex justify-between items-center text-left font-bricolage font-bold text-xl md:text-2xl text-white hover:bg-white/5 focus:outline-none cursor-pointer transition-colors"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-[#3e1916] bg-white/20 px-3.5 py-1 rounded-lg text-base">🚀</span>
                                    Nuestra Visión
                                </span>
                                <span className={`transform transition-transform duration-300 text-2xl ${openTab === 'vision' ? 'rotate-180' : ''}`}>
                                    ▾
                                </span>
                            </button>

                            <AnimatePresence>
                                {openTab === 'vision' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-2 text-base md:text-lg text-white/95 leading-relaxed border-t border-white/10">
                                            Buscamos compartir sonrisas mediante el auténtico sabor del helado artesanal más tradicional de El Salvador. Llegando al mercado salvadoreño a través de la variedad de servicios y presentación de helados.
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}