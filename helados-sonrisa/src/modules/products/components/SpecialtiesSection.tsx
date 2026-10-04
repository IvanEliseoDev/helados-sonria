import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router'
import { menuData } from '../mocks/MenuMock'
import { obtenerImagenProducto } from '../mocks/productCatalog'

// Colores pasteles dinámicos para darle variedad y sabor a la sección
const specialtyBackgrounds = [
    'bg-[#fdf0ec]', // Durazno / Naranja suave
    'bg-[#e2f8f5]', // Turquesa suave
    'bg-[#f4ecfd]', // Lila suave
    'bg-[#eaf4f1]'  // Menta suave
]

export const SpecialtiesSection = () => {
    const navigate = useNavigate()
    
    // Estado para controlar el filtro activo
    const [activeFilter, setActiveFilter] = useState('todos')

    // Combinamos todos los productos que pertenecen a la sección de especialidades
    const allProducts = [
        ...menuData.menu.helados.map(item => ({ ...item, sectionType: 'helados' })),
        ...menuData.menu.sundaes.map(item => ({ ...item, sectionType: 'sundaes' })),
        ...menuData.menu.sorbemangoneadas.map(item => ({ ...item, sectionType: 'sorbemangoneadas' })),
        ...menuData.menu.minutas_dulces.map(item => ({ ...item, sectionType: 'minutas_dulces' })),
        ...menuData.menu.minutas_saladas.map(item => ({ ...item, sectionType: 'minutas_saladas' })),
    ]

    // Definición de las pestañas de filtrado
    const filters = [
        { id: 'todos', label: 'Todos los antojos' },
        { id: 'helados', label: 'Helados' },
        { id: 'sundaes', label: 'Sundaes' },
        { id: 'sorbemangoneadas', label: 'Sorbemangoneadas' },
        { id: 'minutas_dulces', label: 'Minutas Dulces' },
        { id: 'minutas_saladas', label: 'Minutas Saladas' },
    ]

    // Filtrar los productos según la categoría seleccionada
    const filteredProducts = activeFilter === 'todos' 
        ? allProducts 
        : allProducts.filter(product => product.sectionType === activeFilter)

    return (
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-20">
            {/* Encabezado */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#35ab9f]">Para todos los antojos</span>
                    <h2 className="font-bricolage font-bold text-3xl md:text-4xl text-[#2b100e] mt-2">Especialidades & Menú</h2>
                </div>
                <p className="text-sm text-[#555b5a] max-w-md md:text-right">Helados, sundaes, sorbemangoneadas y minutas preparados al momento.</p>
            </div>

            {/* Pestañas de Filtro (Tabs) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
                {filters.map((filter) => {
                    const isActive = activeFilter === filter.id
                    return (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            type="button"
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer shadow-xs ${
                                isActive 
                                    ? 'bg-[#35ab9f] text-white shadow-md scale-105' 
                                    : 'bg-white text-[#555b5a] border border-[#3e1916]/10 hover:bg-[#eaf4f1] hover:text-[#2b100e]'
                            }`}
                        >
                            {filter.label}
                        </button>
                    )
                })}
            </div>

            {/* Grid de Productos Filtrados con Animación */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <AnimatePresence>
                    {filteredProducts.map((product, index) => {
                        const bgClass = specialtyBackgrounds[index % specialtyBackgrounds.length]

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={product.id}
                            >
                                <button
                                    type="button"
                                    onClick={() => navigate(`/products/detail/${product.id}`)}
                                    className={`${bgClass} w-full h-full group border border-[#3e1916]/5 rounded-3xl p-5 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative flex flex-col justify-between`}
                                >
                                    {/* Botón flotante de favorito */}
                                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#2b100e] shadow-xs hover:bg-white hover:scale-110 transition-all">
                                        <Heart className="w-4 h-4" />
                                    </div>

                                    <div>
                                        <div className="aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-white/50 shadow-inner">
                                            <img 
                                                src={obtenerImagenProducto(product.id)} 
                                                alt={product.nombre} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                            />
                                        </div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1b7a73] bg-white/60 px-2.5 py-1 rounded-md">
                                            {product.categoria}
                                        </span>
                                        <h3 className="font-bold text-lg text-[#2b100e] mt-2 group-hover:text-[#35ab9f] transition-colors">
                                            {product.nombre}
                                        </h3>
                                        <p className="text-xs text-[#555b5a] mt-1.5 line-clamp-2 leading-relaxed">
                                            {product.descripcion}
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-[#3e1916]/5 flex items-center justify-between">
                                        <span className="text-xs font-bold text-[#2b100e]">Preparado al momento</span>
                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#35ab9f] group-hover:translate-x-1 transition-transform">
                                            Ver detalle <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </button>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Mensaje si no hay resultados */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-[#555b5a] text-sm">No encontramos productos en esta categoría por el momento.</p>
                </div>
            )}
        </section>
    )
}