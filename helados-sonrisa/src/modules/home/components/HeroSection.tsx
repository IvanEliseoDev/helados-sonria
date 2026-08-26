import { motion } from 'framer-motion'
import { sectionVariants } from './variants/sectionVariants'

export const HeroSection = () => {
    return (
        <motion.section
            id="inicio"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: false }}
            variants={sectionVariants}
            className="relative min-h-[85vh] flex items-center px-6 md:px-12 lg:px-24 pt-12 pb-24 bg-[#EDF3F2]"
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-left">
                    <span className="inline-block bg-[#fadb72] text-[#3e1916] font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                        Artesanal & Natural
                    </span>
                    <h1 className="font-bricolage font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight text-[#006A67]">
                        Comparte una <br />
                        <span className="text-[#B12D16]">sonrisa</span>
                    </h1>
                    <p className="text-lg text-[#727877] max-w-xl leading-relaxed">
                        Cada bola de helado está hecha con ingredientes 100% naturales, frutas frescas de temporada y un toque secreto de amor artesanal para endulzar tus momentos favoritos.
                    </p>
                    <div className="pt-4 flex flex-wrap gap-4">
                        <a href="#delicias" className="bg-[#B12D16] hover:bg-[#e52537]/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#e52537]/20 transition-all transform hover:-translate-y-0.5 text-center min-w-[160px]">
                            Ver Menú
                        </a>
                        <a href="#ubicacion" className="border-2 border-[#4bc0bc] text-[#4bc0bc] hover:bg-[#4bc0bc]/5 font-bold px-8 py-4 rounded-xl transition-all text-center min-w-[160px]">
                            Nuestra Ubicación
                        </a>
                    </div>
                </div>

                <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-[#e52537]/60 ">
                    <img src="https://i.ibb.co/SDyj6w7Z/image.png" alt="Helado Artesanal Principal" className="w-full h-full object-cover" />
                </div>
            </div>
        </motion.section>
    )
}
