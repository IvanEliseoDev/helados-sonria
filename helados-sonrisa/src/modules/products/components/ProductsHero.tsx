import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { slideFromLeftVariants } from './variants/variants' // O puedes usar un fade/scale simple

export const ProductsHero = () => {
    const navigate = useNavigate()

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden">
            {/* Imagen de fondo con overlay para contraste */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&q=80&w=2000" 
                    alt="Helados Artesanales" 
                    className="w-full h-full object-cover"
                />
                {/* Degradado oscuro para resaltar el texto */}
                <div className="absolute inset-0 bg-linear-to-b from-[#006a67]/80 via-[#006a67]/70 to-[#002b29]/90 backdrop-blur-[2px]" />
            </div>

            {/* Contenido centrado */}
            <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.3, once: false }}
                    variants={slideFromLeftVariants}
                    className="flex flex-col items-center space-y-6"
                >
                    {/* Badge */}
                    <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-[#EDF3F2] font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        Catálogo de Sabores 2026
                    </span>

                    {/* Título */}
                    <h1 className="font-bricolage font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight text-white drop-shadow-md">
                        Nuestra Dulce <br />
                        <span className="text-[#FF6B52]">Inspiración</span>
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-lg md:text-xl text-[#EDF3F2]/90 max-w-2xl leading-relaxed font-light">
                        Explora nuestra variedad de helados artesanales elaborados con fruta 100% natural y los mejores ingredientes locales.
                    </p>

                    {/* Botones */}
                    <div className="pt-4 flex flex-wrap justify-center gap-4 w-full">
                        <button
                            type="button"
                            onClick={() => document.getElementById('premium')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#006A67] hover:bg-[#008B87] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-[#006A67]/40 hover:-translate-y-0.5"
                        >
                            Explorar Menú
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/#contacto')}
                            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all backdrop-blur-md hover:-translate-y-0.5"
                        >
                            Hacer Pedido
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}