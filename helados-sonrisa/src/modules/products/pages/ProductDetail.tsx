import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Heart, Sparkles, Tag } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { NavComponent } from '../../../components/global/NavComponent'
import { obtenerImagenProducto, obtenerProducto, obtenerRecomendaciones } from '../mocks/productCatalog'

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const producto = obtenerProducto(id)
  const [seleccion, setSeleccion] = useState({ id: id ?? '', presentacion: producto?.presentaciones?.[0] ?? '' })
  const presentacionElegida = seleccion.id === producto?.id ? seleccion.presentacion : producto?.presentaciones?.[0] ?? ''

  if (!producto) {
    return (
      <div className="min-h-screen bg-[#fffcf9] text-[#2b100e]">
        <NavComponent />
        <main className="max-w-3xl mx-auto px-6 py-32 text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#35ab9f]">Catálogo</p>
          <h1 className="font-bricolage text-4xl font-bold">Producto no encontrado</h1>
          <p className="text-[#555b5a]">El producto solicitado ya no está disponible en nuestro menú.</p>
          <button type="button" onClick={() => navigate('/products')} className="inline-flex items-center gap-2 rounded-xl bg-[#006a67] px-6 py-3 font-bold text-white hover:bg-[#005250]">
            <ArrowLeft className="w-4 h-4" /> Volver al catálogo
          </button>
        </main>
      </div>
    )
  }

  const imagen = obtenerImagenProducto(producto.id)
  const recomendaciones = obtenerRecomendaciones(producto)

  return (
    <div className="min-h-screen bg-[#fffcf9] text-[#2b100e]">
      <NavComponent />
      <main className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <button type="button" onClick={() => navigate('/products')} className="inline-flex items-center gap-2 text-sm font-bold text-[#555b5a] hover:text-[#006a67] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start mt-10">
          <div className="aspect-4/3 rounded-3xl overflow-hidden bg-[#e9f4f1] border border-[#3e1916]/10 shadow-sm">
            <img src={imagen} alt={producto.nombre} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-7 lg:pt-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#35ab9f]/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1b7a73]">
                <Tag className="w-4 h-4" /> {producto.categoria}
              </span>
              <h1 className="font-bricolage text-4xl md:text-6xl font-bold leading-tight text-[#2b100e]">{producto.nombre}</h1>
              <span className="block text-xs font-mono font-bold text-[#555b5a]/70">ID: {producto.id}</span>
            </div>

            <p className="text-lg leading-relaxed text-[#555b5a]">{producto.descripcion}</p>

            {producto.presentaciones && producto.presentaciones.length > 0 && (
              <div className="space-y-3 border-t border-[#3e1916]/10 pt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider">Presentación disponible</h2>
                <div className="flex flex-wrap gap-3">
                  {producto.presentaciones.map((presentacion) => (
                    <button type="button" key={presentacion} onClick={() => setSeleccion({ id: producto.id, presentacion })} className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-colors ${presentacionElegida === presentacion ? 'border-[#35ab9f] bg-[#35ab9f] text-white' : 'border-[#3e1916]/15 bg-white text-[#555b5a] hover:border-[#35ab9f]'}`}>
                      {presentacionElegida === presentacion && <Check className="w-4 h-4" />}
                      {presentacion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {producto.disponibilidad && (
              <div className="flex items-center gap-3 rounded-2xl border border-[#35ab9f]/20 bg-[#e9f4f1] p-4 text-sm font-bold text-[#1b7a73]">
                <Sparkles className="w-5 h-5 text-[#35ab9f]" /> {producto.disponibilidad}
              </div>
            )}
          </div>
        </div>

        {recomendaciones.length > 0 && (
          <section className="mt-20 border-t border-[#3e1916]/10 pt-12">
            <div className="flex items-center gap-3 mb-8">
              <Heart className="w-5 h-5 text-[#b12d16]" />
              <h2 className="font-bricolage text-2xl md:text-3xl font-bold">Más de {producto.categoria}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recomendaciones.map((recomendado) => (
                <button type="button" key={recomendado.id} onClick={() => navigate(`/products/detail/${recomendado.id}`)} className="group rounded-2xl border border-[#3e1916]/10 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="aspect-4/3 overflow-hidden rounded-xl">
                    <img src={obtenerImagenProducto(recomendado.id)} alt={recomendado.nombre} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <span className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-[#1b7a73]">{recomendado.categoria}</span>
                  <h3 className="mt-1 font-bold text-[#2b100e]">{recomendado.nombre}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#35ab9f]">Ver detalle <ArrowRight className="w-4 h-4" /></span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
