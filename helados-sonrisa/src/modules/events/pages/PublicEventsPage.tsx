import { useState } from 'react'
import { NavComponent } from '../../../components/global/NavComponent'
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router'

interface EventoPasado {
  id: number
  titulo: string
  categoria: 'Boda' | 'Corporativo' | 'Cumpleaños'
  fecha: string
  ubicacion: string
  asistentes: string
  imagen: string
  descripcion: string
}

export const PublicEventsPage = () => {
  const [filtro, setFiltro] = useState<string>('Todos')

  // Marcas/Empresas colaboradoras con imágenes de logo
  const empresas = [
    {
      id: 1,
      nombre: 'TELUS International El Salvador',
      tag: 'Corporativo',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      nombre: 'Banco Agrícola S.A.',
      tag: 'Financiero',
      logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      nombre: 'Almacenes Siman Centroamérica',
      tag: 'Retail',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      nombre: 'Applaudo Software Studios',
      tag: 'Tech',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      nombre: 'Hotel Sheraton Presidente',
      tag: 'Hostelería',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&auto=format&fit=crop&q=80'
    },
  ]

  // Eventos pasados
  const eventos: EventoPasado[] = [
    {
      id: 1,
      titulo: 'Boda Sofía & Mateo',
      categoria: 'Boda',
      fecha: 'Febrero 2026',
      ubicacion: 'San Salvador',
      asistentes: '150 invitados',
      imagen: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80',
      descripcion: 'Estación de gelato en vivo con maridaje de frutos rojos para la recepción.',
    },
    {
      id: 2,
      titulo: 'Aniversario Tech Hub',
      categoria: 'Corporativo',
      fecha: 'Enero 2026',
      ubicacion: 'Santa Tecla',
      asistentes: '300 asistentes',
      imagen: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80',
      descripcion: 'Carrito retro personalizado con toppings artesanales para todo el equipo.',
    },
    {
      id: 3,
      titulo: 'Fiesta Infantil Marina',
      categoria: 'Cumpleaños',
      fecha: 'Diciembre 2025',
      ubicacion: 'Antiguo Cuscatlán',
      asistentes: '80 niños',
      imagen: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&auto=format&fit=crop&q=80',
      descripcion: 'Paletas de sabores pastel diseñadas para temática marina.',
    },
    {
      id: 4,
      titulo: 'Gala Anual de Marcas',
      categoria: 'Corporativo',
      fecha: 'Noviembre 2025',
      ubicacion: 'San Salvador',
      asistentes: '500 invitados',
      imagen: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&auto=format&fit=crop&q=80',
      descripcion: 'Cata guiada de sorbetes artesanales con ingredientes locales.',
    },
  ]

  const eventosFiltrados = filtro === 'Todos'
    ? eventos
    : eventos.filter(ev => ev.categoria === filtro)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#fffcf9] text-[#3e1916] px-6 md:px-12 font-sans">
      <NavComponent />

      {/* Estilos CSS para el scroll continuo */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1600px] pt-20 mx-auto space-y-16">

        {/* ENCABEZADO EDITORIAL */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#3e1916]/15 pb-12">
          <div className="space-y-4 max-w-3xl">
            <span className="inline-block bg-[#4bc0bc]/20 text-[#1b7a73] font-extrabold text-sm uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border border-[#4bc0bc]/30">
              Bitácora de Sabores & Celebraciones
            </span>
            <h1 className="font-bricolage font-black text-4xl sm:text-5xl md:text-6xl text-[#2b100e] leading-[1.15] tracking-tight">
              Donde cada fiesta <br className="hidden md:block" />
              <span className="text-[#35ab9f] italic font-serif">deja una huella</span> dulce.
            </h1>
            <p className="text-lg md:text-xl text-[#555b5a] font-normal leading-relaxed max-w-2xl">
              Explora nuestra colección visual de bodas, aniversarios y encuentros corporativos atendidos con heladería artesanal de autor.
            </p>
          </div>

          {/* BOTÓN PRINCIPAL (DIRECTO A AGENDAR / SIN MODAL) */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => navigate("./agendar")}
              className="w-full sm:w-auto bg-[#2b100e] hover:bg-[#35ab9f] text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Agendar mi evento</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* CINTA DE EMPRESAS TARJETAS */}
        <div className="space-y-6 py-4">
          {/* Encabezado discreto */}
          <div className="">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3e1916]/50">
              Marcas y Alianzas que Confían en Nosotros
            </span>
          </div>

          {/* Ticker Infinito Minimalista */}
          <div className="relative overflow-hidden py-4">
            {/* Máscaras de degradado lateral para desvanecimiento suave */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-[#fffcf9] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-[#fffcf9] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-12 md:gap-20">
              {[...empresas, ...empresas].map((emp, index) => (
                <div
                  key={`${emp.id}-${index}`}
                  className="flex items-center gap-3 flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer group"
                >
                  <img
                    src={emp.logo}
                    alt={emp.nombre}
                    className="h-8 md:h-12 w-auto object-contain max-w-[150px]"
                  />
                  {emp.nombre && (
                    <span className="font-bold text-sm md:text-base text-[#3e1916] group-hover:text-[#35ab9f] transition-colors whitespace-nowrap">
                      {emp.nombre}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILTROS TIPO TAGS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <span className="text-sm font-extrabold uppercase tracking-wider text-[#555b5a]">
            Mostrando {eventosFiltrados.length} registros
          </span>
          <div className="flex flex-wrap gap-3">
            {['Todos', 'Boda', 'Corporativo', 'Cumpleaños'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`px-6 py-3 rounded-full text-base font-bold transition-all cursor-pointer ${filtro === cat
                    ? 'bg-[#2b100e] text-[#fffcf9] shadow-md'
                    : 'bg-white text-[#555b5a] border border-[#3e1916]/20 hover:border-[#2b100e] hover:text-[#2b100e]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* LAYOUT BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {eventosFiltrados.map((evento, index) => {
            const isLarge = index % 3 === 0
            const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4'

            return (
              <div
                key={evento.id}
                className={`${colSpan} group relative bg-white border border-[#3e1916]/15 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end min-h-[500px] md:min-h-[560px]`}
              >
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Capa de contraste oscuro para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180806]/95 via-[#180806]/65 to-transparent" />

                {/* Badges superiores */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                  <span className="bg-white text-[#2b100e] text-sm font-black px-4 py-2 rounded-full shadow-md">
                    {evento.categoria}
                  </span>
                  <span className="text-white text-sm font-bold bg-[#180806]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#35ab9f]" />
                    {evento.fecha}
                  </span>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 p-8 space-y-4 text-white">
                  <div className="space-y-2">
                    <h3 className="font-bricolage font-black text-2xl md:text-3xl text-white leading-snug">
                      {evento.titulo}
                    </h3>
                    <p className="text-base md:text-lg text-white/95 line-clamp-2 font-normal leading-relaxed">
                      {evento.descripcion}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/30 flex flex-wrap justify-between items-center gap-3 text-sm font-bold text-white">
                    <span className="flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-xl backdrop-blur-xs">
                      <MapPin className="w-4 h-4 text-[#35ab9f]" />
                      {evento.ubicacion}
                    </span>
                    <span className="bg-[#35ab9f] text-white px-4 py-1.5 rounded-full font-extrabold shadow-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {evento.asistentes}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}