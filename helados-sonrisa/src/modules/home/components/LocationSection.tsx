import { motion } from "framer-motion"
import { sectionVariants } from "./variants/sectionVariants"

export const LocationSection = () => {
    return (
        <motion.section
            id="ubicacion"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: false }}
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-28"
        >
            <div className="text-center space-y-4 mb-16">
                <h2 className="font-bricolage font-bold text-4xl md:text-5xl text-[#006A67]">
                    Nuestras Ubicacion
                </h2>
                <p className="text-[#727877] max-w-2xl mx-auto">
                    Explora una explosión de sabores únicos y refrescantes hechos a mano todos los días. Desde clásicos cremosos hasta especialidades exóticas.
                </p>
            </div>
            <div className="bg-[#F5FAF9] border border-[#3e1916]/10 rounded-[32px] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-white/40">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#e52537] font-semibold text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <span>Visítanos en persona</span>
                        </div>
                        <h2 className="font-bricolage font-bold text-3xl md:text-4xl text-[#4bc0bc] leading-tight">
                            A pasos del <br />Parque Acuático
                        </h2>
                        <p className="text-[#727877] text-sm leading-relaxed">
                            Estamos ubicados en una zona privilegiada de El Cafetalón. El lugar perfecto para refrescarte después de una tarde soleada de caminata, deportes o diversión familiar.
                        </p>

                        <div className="space-y-3 pt-4 border-t border-[#3e1916]/10 text-sm text-[#3e1916]/80">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#4bc0bc]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>Lun - Dom: 10:00 AM - 7:30 PM</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#4bc0bc]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <span>Paseo El Cafetalón, Santa Tecla, El Salvador</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#4bc0bc] hover:bg-[#4bc0bc]/90 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm">
                            <span>Cómo llegar ahora</span>
                            <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-7 relative min-h-[320px] bg-[#fadb72]/20">
                    <img src="https://i.ibb.co/BHTxTTnV/Gemini-Generated-Image-on9qyaon9qyaon9q.png" alt="Ubicación en el mapa de El Cafetalón" className="w-full h-full object-cover" />
                </div>
            </div>
        </motion.section>
    )
}
