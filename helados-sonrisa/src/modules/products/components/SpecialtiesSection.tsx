import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { menuData } from '../mocks/MenuMock'
import { obtenerImagenProducto } from '../mocks/productCatalog'

export const SpecialtiesSection = () => {
    const navigate = useNavigate()
    const products = [
        ...menuData.menu.sundaes,
        ...menuData.menu.sorbemangoneadas,
        ...menuData.menu.minutas_dulces,
        ...menuData.menu.minutas_saladas,
    ]

    return (
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#35ab9f]">Para todos los antojos</span>
                    <h2 className="font-bricolage font-bold text-3xl md:text-4xl text-[#2b100e] mt-2">Especialidades</h2>
                </div>
                <p className="text-sm text-[#555b5a] max-w-md md:text-right">Sundaes, sorbemangoneadas y minutas preparados al momento.</p>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: false }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {products.map((product) => (
                    <motion.button
                        type="button"
                        key={product.id}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        onClick={() => navigate(`/products/detail/${product.id}`)}
                        className="group bg-white border border-[#3e1916]/10 rounded-2xl p-4 text-left shadow-sm hover:shadow-xl transition-all cursor-pointer"
                    >
                        <div className="aspect-4/3 rounded-xl overflow-hidden mb-4">
                            <img src={obtenerImagenProducto(product.id)} alt={product.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1b7a73]">{product.categoria}</span>
                        <h3 className="font-bold text-lg text-[#2b100e] mt-1">{product.nombre}</h3>
                        <p className="text-xs text-[#555b5a] mt-2 line-clamp-2">{product.descripcion}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#35ab9f]">Ver detalle <ArrowRight className="w-4 h-4" /></span>
                    </motion.button>
                ))}
            </motion.div>
        </section>
    )
}
