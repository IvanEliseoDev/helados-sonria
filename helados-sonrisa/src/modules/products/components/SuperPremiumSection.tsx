import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { useNavigate } from 'react-router'
import { slideFromLeftVariants, slideFromRightVariants } from './variants/variants'
import { menuData } from '../mocks/MenuMock'
import { obtenerImagenProducto } from '../mocks/productCatalog'

export const SuperPremiumSection = () => {
    const navigate = useNavigate()
    const products = menuData.menu.helados.filter((item) => item.categoria === 'Súper Premium')

    return (
        <section className="bg-[#e9f4f1] py-20 px-6 md:px-12 lg:px-20 overflow-x-clip">
            <div className="max-w-[1400px] mx-auto space-y-12">
                {/* Encabezado de la sección */}
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b12d16]">Recetas de autor</span>
                    <h2 className="font-bricolage font-bold text-3xl md:text-5xl text-[#006a67]">
                        Súper Premium
                    </h2>
                    <p className="text-base md:text-lg text-[#727877]">
                        Llevamos lo artesanal a un nuevo nivel de sabor.
                    </p>
                </div>

                {/* Grid de productos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {products.map((product, index) => {
                        const variants = index % 2 === 0 ? slideFromLeftVariants : slideFromRightVariants

                        return (
                            <motion.button
                                type="button"
                                key={product.id}
                                onClick={() => navigate(`/products/detail/${product.id}`)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.3, once: false }}
                                variants={variants}
                                className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col sm:flex-row gap-6 items-center border border-[#3e1916]/10 text-left cursor-pointer relative group"
                            >
                                {/* Botón flotante de favorito */}
                                <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-[#f4ecfd]/80 backdrop-blur-xs flex items-center justify-center text-[#2b100e] shadow-xs hover:bg-[#f4ecfd] hover:scale-110 transition-all">
                                    <Heart className="w-4 h-4" />
                                </div>

                                <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-[#e9f4f1]/50 shadow-inner">
                                    <img 
                                        src={obtenerImagenProducto(product.id)} 
                                        alt={product.nombre} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>

                                <div className="space-y-3 text-left w-full">
                                    <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-[#006a67] bg-[#006a67]/10 px-3 py-1 rounded-full">
                                        {product.categoria}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#2b100e] group-hover:text-[#006a67] transition-colors">
                                        {product.nombre}
                                    </h3>
                                    <p className="text-sm md:text-base text-[#555b5a] leading-relaxed line-clamp-2">
                                        {product.descripcion}
                                    </p>
                                    <span className="text-sm md:text-base font-bold text-[#006a67] pt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Ver detalles <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}