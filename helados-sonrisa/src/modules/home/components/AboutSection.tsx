import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Rocket, IceCreamCone, Heart, Sparkles, Award } from 'lucide-react'
import boss from "../../../assets/dueños-helados-sonrisa.png"

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState<'mision' | 'vision'>('mision')

    return (
        <section id="nosotros" className="relative bg-[#fffcf9] py-24 overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-[#fadb72]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#35ab9f]/15 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10"
            >
                {/* Encabezado Principal */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">


                    <h2 className="font-bricolage font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#3e1916] leading-tight">
                        Artesanos del Sabor <br />
                        <span className="text-[#35ab9f] underline decoration-[#fadb72] decoration-wavy decoration-4">
                            en El Cafetalón
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Galería / Imagen Multicapa */}
                    <div className="lg:col-span-6 relative w-full max-w-md lg:max-w-none mx-auto">
                        {/* Marco rotado decorativo */}
                        <div className="absolute inset-0 bg-[#fadb72] rounded-3xl transform -rotate-3 scale-105 shadow-md" />
                        <div className="absolute inset-0 bg-[#35ab9f] rounded-3xl transform rotate-2 scale-100 opacity-60" />

                        {/* Imagen principal */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#3e1916]">
                            <img
                                src={boss}
                                alt="Helados artesanos en El Cafetalón"
                                className="w-full h-[420px] md:h-[480px] object-cover block transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3e1916]/70 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute -bottom-6 -left-4 bg-[#e52537] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-xl border-2 border-white flex items-center gap-3"
                        >
                            <div className="bg-white/20 p-2 rounded-xl">
                                <IceCreamCone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-white/80 font-normal">Tradición desde</p>
                                <p className="text-base font-extrabold">2015</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute -top-6 -right-4 bg-white text-[#3e1916] px-5 py-3 rounded-2xl font-bold text-sm shadow-xl border border-gray-100 flex items-center gap-3 hidden sm:flex"
                        >
                            <Award className="w-6 h-6 text-[#fadb72]" />
                            <div>
                                <p className="text-xs text-gray-500 font-normal">Calidad Garantizada</p>
                                <p className="text-sm font-bold text-[#3e1916]">100% Artesanal</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contenido interactivo */}
                    <div className="lg:col-span-6 space-y-8">
                        <p className="text-[#3e1916]/80 text-lg md:text-xl leading-relaxed font-normal">
                            Nos apasiona transformar ingredientes frescos de El Salvador en experiencias cremosas e inolvidables. Todos los días preparamos lotes pequeños para garantizar la frescura absoluta que nos caracteriza en cada cucharada.
                        </p>

                        {/* Pestañas de Navegación (Misión / Visión) */}
                        <div className="bg-[#3e1916] p-2 rounded-2xl shadow-xl border border-[#3e1916]">
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('mision')}
                                    className={`py-3 px-4 rounded-xl font-bricolage font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'mision'
                                        ? 'bg-[#35ab9f] text-white shadow-lg'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Target className="w-4 h-4" /> Nuestra Misión
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('vision')}
                                    className={`py-3 px-4 rounded-xl font-bricolage font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 cursor-pointer ${activeTab === 'vision'
                                        ? 'bg-[#35ab9f] text-white shadow-lg'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Rocket className="w-4 h-4" /> Nuestra Visión
                                </button>
                            </div>

                            {/* Contenido dinámico de las Pestañas */}
                            <div className="px-4 pb-4 pt-2 min-h-[140px]">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'mision' ? (
                                        <motion.div
                                            key="mision"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-3"
                                        >
                                            <h3 className="text-[#fadb72] font-bricolage font-bold text-xl flex items-center gap-2">
                                                <Heart className="w-5 h-5 text-[#e52537] fill-[#e52537]" />
                                                Crear momentos de felicidad
                                            </h3>
                                            <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                                Compartir e inspirar sonrisas, brindando helados artesanales de la más
                                                alta calidad, utilizando ingredientes naturales y frescos para ofrecer a nuestros clientes una
                                                experiencia de sabor inolvidable. Nuestra misión es crear un espacio acogedor donde cada visita
                                                se convierta en una aventura dulce y memorable.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="vision"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-3"
                                        >
                                            <h3 className="text-[#fadb72] font-bricolage font-bold text-xl flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-[#fadb72]" />
                                                Liderar la tradición artesanal
                                            </h3>
                                            <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                                Para el año 2028, consolidarnos como la marca líder de helados
                                                artesanales en El Salvador, destacándose  por la calidad, autenticidad e innovación de nuestros
                                                sabores naturales, llevando sonrisas y experiencias memorables a cada cliente.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}