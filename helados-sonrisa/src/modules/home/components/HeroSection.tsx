import { motion } from 'framer-motion'
import { Heart, MapPin, Utensils, IceCreamCone } from 'lucide-react'
import { useNavigate } from 'react-router'
import icecream from "../../../assets/helado-coco-sonrisas.jpg"

export const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <motion.section
            id="inicio"
            className="relative min-h-[90vh] flex items-center px-6 md:px-12 lg:px-24 pt-16 pb-24 bg-[#fffcf9] overflow-hidden"
        >
            {/* Luces decorativas de fondo */}
            <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#fadb72]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#35ab9f]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
                
                {/* Contenido de Texto */}
                <div className="lg:col-span-7 space-y-7 text-left">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-[#fadb72]/40 text-[#3e1916] font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[#fadb72]"
                    >
                        <IceCreamCone className="w-4 h-4 text-[#e52537]" />
                        <span>Heladería Artesanal</span>
                    </motion.div>
                    
                    <h1 className="font-bricolage font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-[#3e1916]">
                        Comparte una <br />
                        <span className="text-[#e52537] relative inline-block mt-1">
                            sonrisa
                            {/* Subrayado con trazo orgánico */}
                            <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#35ab9f]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="transparent" />
                            </svg>
                        </span>
                        
                    </h1>
                    
                    <p className="text-lg md:text-xl text-[#3e1916]/80 max-w-xl leading-relaxed font-normal">
                        Cada bola de helado se elabora diariamente en lotes pequeños utilizando fruta fresca salvadoreña y recetas artesanales para llenar de alegría cada cucharada.
                    </p>
                    
                    {/* Botones de Acción */}
                    <div className="pt-2 flex flex-wrap gap-4 items-center">
                        <button 
                            type="button"
                            onClick={() => navigate("/products")}
                            className="cursor-pointer bg-[#e52537] hover:bg-[#c41e2e] text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-[#e52537]/25 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 min-w-[170px]"
                        >
                            <Utensils className="w-5 h-5" />
                            <span>Explorar Menú</span>
                        </button>
                        
                        <a 
                            href="#ubicacion" 
                            className="bg-white border-2 border-[#35ab9f] text-[#35ab9f] hover:bg-[#35ab9f] hover:text-white font-bold px-8 py-4 rounded-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-sm flex items-center justify-center gap-2 min-w-[170px]"
                        >
                            <MapPin className="w-5 h-5" />
                            <span>Visítanos</span>
                        </a>
                    </div>

                    {/* Micro-prueba social */}
                    <div className="pt-6 border-t border-[#3e1916]/10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#fadb72] p-2 rounded-xl text-[#3e1916]">
                                <IceCreamCone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-extrabold text-[#3e1916] text-sm md:text-base leading-none">+20 Sabores</p>
                                <p className="text-xs text-[#3e1916]/60">Deliciosos</p>
                            </div>
                        </div>  
                    </div>
                </div>

                {/* Composición Gráfica / Imagen con Marcos en Capa */}
                <div className="lg:col-span-5 relative w-full aspect-square max-w-md lg:max-w-none mx-auto flex justify-center items-center mt-6 lg:mt-0">
                    
                    {/* Tarjeta 1 de Fondo Rotada (Amarilla) */}
                    <div className="absolute inset-2 bg-[#fadb72] rounded-[3rem] transform -rotate-6 shadow-md transition-transform hover:-rotate-3 duration-500" />
                    
                    {/* Tarjeta 2 de Fondo Rotada (Turquesa) */}
                    <div className="absolute inset-2 bg-[#35ab9f] rounded-[3rem] transform rotate-3 shadow-lg opacity-80 transition-transform hover:rotate-1 duration-500" />

                    {/* Contenedor Principal de la Imagen */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-[#3e1916] z-10"
                    >
                        <img 
                            src={icecream} 
                            alt="Helado Artesanal Sonrisa" 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3e1916]/50 via-transparent to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Badge Flotante 1: Amor Diario */}
                    <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -bottom-4 -left-4 z-20 bg-white p-3.5 px-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
                    >
                        <div className="bg-[#e52537] p-2.5 rounded-xl text-white shadow-md shadow-[#e52537]/30">
                            <Heart className="w-5 h-5 fill-white" />
                        </div>
                        <div>
                            <p className="text-[10px] text-[#3e1916]/60 font-bold uppercase tracking-wider">Hecho con</p>
                            <p className="text-sm font-extrabold text-[#3e1916]">Amor Diario</p>
                        </div>
                    </motion.div>

                    {/* Badge Flotante 2: Calidad Premium */}
                    

                </div>

            </div>
        </motion.section>
    )
}