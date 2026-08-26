import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { containerStaggerVariants, fadeInVariants } from './variants/variants'
import { menuData } from '../mocks/MenuMock'
import { obtenerImagenProducto } from '../mocks/productCatalog'

export const PremiumLineSection = () => {
    const navigate = useNavigate()
    const premiumItems = menuData.menu.helados.filter((item) => item.categoria === 'Premium')

    return (
        <section id="premium" className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
            <div className="flex items-end justify-between gap-6 mb-10">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#35ab9f]">Sabores frutales</span>
                    <h2 className="font-bricolage font-bold text-3xl md:text-4xl text-[#2b100e] mt-2">Línea <span className="text-[#35ab9f]">Premium</span></h2>
                </div>
                <span className="hidden sm:block text-sm text-[#555b5a]">{premiumItems.length} sabores artesanales</span>
            </div>

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: false }}
                variants={containerStaggerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
            >
                {premiumItems.map((item) => (
                    <motion.button type="button" onClick={() => navigate(`/products/detail/${item.id}`)} key={item.id} variants={fadeInVariants} className="bg-white rounded-2xl p-4 border border-[#3e1916]/10 shadow-sm hover:shadow-xl transition-all text-left group cursor-pointer">
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                            <img src={obtenerImagenProducto(item.id)} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1b7a73]">{item.categoria}</span>
                        <h3 className="font-bold text-lg text-[#2b100e] mt-1">{item.nombre}</h3>
                        <p className="text-xs text-[#555b5a] mt-2 line-clamp-2">{item.descripcion}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#35ab9f]">Ver detalle <ArrowRight className="w-4 h-4" /></span>
                    </motion.button>
                ))}
            </motion.div>
        </section>
    )
}