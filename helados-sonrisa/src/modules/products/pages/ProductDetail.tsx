import { useState } from 'react'
import { 
  ArrowLeft, 
  Check, 
  Heart, 
  Sparkles, 
  Tag, 
  PackageX,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { NavComponent } from '../../../components/global/NavComponent'
import { obtenerImagenProducto, obtenerProducto, obtenerRecomendaciones } from '../mocks/productCatalog'

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const producto = obtenerProducto(id)
  
  const [seleccion, setSeleccion] = useState({ 
    id: id ?? '', 
    presentacion: producto?.presentaciones?.[0] ?? '' 
  })

  const presentacionElegida = seleccion.id === producto?.id 
    ? seleccion.presentacion 
    : producto?.presentaciones?.[0] ?? ''

  // Pantalla de estado: Producto no encontrado
  if (!producto) {
    return (
      <div className="min-h-screen bg-[#fffcf9] text-[#3e1916] flex flex-col">
        <NavComponent />
        <main className="flex-1 max-w-xl mx-auto px-6 flex flex-col justify-center items-center text-center py-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#3e1916]/10 p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5 w-full space-y-6"
          >
            <div className="w-16 h-16 bg-[#e52537]/10 text-[#e52537] rounded-2xl flex items-center justify-center mx-auto">
              <PackageX className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#35ab9f]">Menú & Catálogo</span>
              <h1 className="font-bricolage text-3xl font-extrabold text-[#3e1916]">Producto no encontrado</h1>
              <p className="text-sm text-[#3e1916]/70 leading-relaxed">
                El producto solicitado ya no está disponible en nuestro menú o el identificador es incorrecto.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/products')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#35ab9f] px-6 py-3.5 text-sm font-extrabold text-white hover:bg-[#2c9389] transition-all shadow-md shadow-[#35ab9f]/20 cursor-pointer w-full"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al catálogo
            </button>
          </motion.div>
        </main>
      </div>
    )
  }

  const imagen = obtenerImagenProducto(producto.id)
  const recomendaciones = obtenerRecomendaciones(producto)

  return (
    <div className="min-h-screen bg-[#fffcf9] text-[#3e1916] pb-24">
      <NavComponent />

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-8 md:pt-12 space-y-16">
        
        {/* Botón Volver */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#3e1916]/70 hover:text-[#35ab9f] transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#3e1916]/10 flex items-center justify-center shadow-sm group-hover:border-[#35ab9f]/40 group-hover:bg-[#35ab9f]/10 transition-all">
              <ArrowLeft className="w-4 h-4 text-[#3e1916] group-hover:text-[#35ab9f]" />
            </div>
            <span>Volver al catálogo</span>
          </button>
        </motion.div>

        {/* Sección Principal del Producto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Imagen de Producto */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 lg:sticky lg:top-28"
          >
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white border border-[#3e1916]/10 shadow-xl shadow-[#3e1916]/5 group">
              <img
                src={imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

            </div>
          </motion.div>

          {/* Información y Detalles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#35ab9f]/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#35ab9f]">
                  <Tag className="w-3.5 h-3.5" /> {producto.categoria}
                </span>
              </div>

              <h1 className="font-bricolage text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#3e1916]">
                {producto.nombre}
              </h1>

              <p className="text-base md:text-lg text-[#3e1916]/75 leading-relaxed font-normal">
                {producto.descripcion}
              </p>
            </div>

            {/* Selector de Presentación */}
            {producto.presentaciones && producto.presentaciones.length > 0 && (
              <div className="space-y-4 border-t border-[#3e1916]/10 pt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#3e1916]/80">
                    Presentación Disponible
                  </h2>
                  <span className="text-xs text-[#35ab9f] font-extrabold">
                    Elegido: {presentacionElegida}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {producto.presentaciones.map((presentacion) => {
                    const esSeleccionado = presentacionElegida === presentacion
                    return (
                      <button
                        type="button"
                        key={presentacion}
                        onClick={() => setSeleccion({ id: producto.id, presentacion })}
                        className={`relative inline-flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-extrabold transition-all cursor-pointer ${
                          esSeleccionado
                            ? 'border-[#35ab9f] bg-[#35ab9f] text-white shadow-md shadow-[#35ab9f]/25'
                            : 'border-[#3e1916]/15 bg-white text-[#3e1916]/80 hover:border-[#35ab9f]/50 hover:bg-[#fffcf9]'
                        }`}
                      >
                        {esSeleccionado && <Check className="w-4 h-4 text-white" />}
                        <span>{presentacion}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Disponibilidad y Calidad */}
            <div className="space-y-3 border-t border-[#3e1916]/10 pt-6">
              {producto.disponibilidad && (
                <div className="flex items-center gap-3 rounded-2xl border border-[#35ab9f]/30 bg-[#35ab9f]/10 p-4 text-sm font-extrabold text-[#35ab9f]">
                  <div className="p-2 rounded-xl bg-white text-[#35ab9f] shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span>{producto.disponibilidad}</span>
                </div>
              )}

              <div className="flex items-center gap-3 rounded-2xl border border-[#3e1916]/10 bg-white p-4 text-xs font-bold text-[#3e1916]/70 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#fadb72] shrink-0" />
                <span>Elaborado diariamente con insumos 100% naturales y frescos.</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Sección de Productos Relacionados */}
        {recomendaciones.length > 0 && (
          <section className="border-t border-[#3e1916]/10 pt-16 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#e52537]/10 text-[#e52537]">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h2 className="font-bricolage text-2xl md:text-3xl font-extrabold text-[#3e1916]">
                  Más de {producto.categoria}
                </h2>
                <p className="text-xs md:text-sm text-[#3e1916]/60">Descubre otras opciones de la misma categoría</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recomendaciones.map((recomendado, idx) => (
                <motion.button
                  type="button"
                  key={recomendado.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  onClick={() => navigate(`/products/detail/${recomendado.id}`)}
                  className="group rounded-3xl border border-[#3e1916]/10 bg-white p-4 text-left shadow-sm hover:shadow-xl hover:shadow-[#3e1916]/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4 w-full">
                    <div className="aspect-4/3 overflow-hidden rounded-2xl bg-[#fffcf9] relative">
                      <img
                        src={obtenerImagenProducto(recomendado.id)}
                        alt={recomendado.nombre}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#35ab9f]">
                        {recomendado.categoria}
                      </span>
                      <h3 className="mt-1 font-bricolage font-extrabold text-lg text-[#3e1916] group-hover:text-[#35ab9f] transition-colors line-clamp-1">
                        {recomendado.nombre}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#3e1916]/5 flex items-center justify-between text-xs font-extrabold text-[#35ab9f] group-hover:text-[#2c9389]">
                    <span>Ver detalle</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  )
}