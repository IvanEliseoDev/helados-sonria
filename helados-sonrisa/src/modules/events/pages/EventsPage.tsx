import React, { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  PartyPopper,
  ChevronDown,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'
import { NavComponent } from '../../../components/global/NavComponent'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

interface Evento {
  id: number
  nombre: string
  apellido: string
  telefono: string
  email: string
  ubicacion: string
  tipo: string
  descripcion: string
  estado: 'Pendiente' | 'Revisado' | 'Confirmado'
}

export const EventsPage = () => {
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Mendoza',
      telefono: '+503 7000-0000',
      email: 'carlos@example.com',
      ubicacion: 'San Salvador',
      tipo: 'Cumpleaños',
      descripcion: 'Fiesta infantil para 50 personas con carrito de helados.',
      estado: 'Confirmado',
    },
  ])

  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    ubicacion: '',
    tipo: 'Cumpleaños',
    descripcion: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.telefono) return

    const nuevoEvento: Evento = {
      id: Date.now(),
      ...form,
      estado: 'Pendiente',
    }

    setEventos([nuevoEvento, ...eventos])
    setForm({
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      ubicacion: '',
      tipo: 'Cumpleaños',
      descripcion: '',
    })
  }

  return (
    <div className="min-h-screen bg-[#fffcf9] text-[#3e1916] pb-24">
      <NavComponent />

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-12 space-y-16">

        {/* SECCIÓN SUPERIOR: HERO + FORMULARIO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Izquierda: Información y Beneficios */}
          <div className="lg:col-span-5 space-y-8 lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button
                type="button"
                onClick={() => navigate('/eventos')}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#3e1916]/70 hover:text-[#35ab9f] transition-colors group cursor-pointer"
              >
                <div className=" w-8 h-8 rounded-full bg-white border border-[#3e1916]/10 flex items-center justify-center shadow-sm group-hover:border-[#35ab9f]/40 group-hover:bg-[#35ab9f]/10 transition-all">
                  <ArrowLeft className="w-4 h-4 text-[#3e1916] group-hover:text-[#35ab9f]" />
                </div>
                <span>Volver a la bitacora</span>
              </button>
            </motion.div>
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 bg-[#fadb72]/40 text-[#3e1916] font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[#fadb72]">
                <span>Servicio para Eventos</span>
              </span>

              <h1 className="font-bricolage font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#3e1916] leading-tight">
                Lleva la dulzura a tus <span className="text-[#35ab9f]">momentos especiales</span>
              </h1>

              <p className="text-base md:text-lg text-[#3e1916]/75 leading-relaxed">
                Haz de tu fiesta, boda o evento corporativo una experiencia inolvidable con nuestro servicio de helados artesanales y carritos temáticos.
              </p>
            </div>

            {/* Ventajas del servicio */}
            <div className="bg-white border border-[#3e1916]/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bricolage font-bold text-lg text-[#3e1916]">¿Qué incluye nuestro servicio?</h3>
              <ul className="space-y-3 text-sm text-[#3e1916]/80">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#35ab9f] shrink-0" />
                  <span>Carrito temático decorado para tu evento</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#35ab9f] shrink-0" />
                  <span>Variedad de sabrosos helados 100% artesanales</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#35ab9f] shrink-0" />
                  <span>Personal capacitado para atención a tus invitados</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Derecha: Formulario de Agendamiento */}
          <div className="lg:col-span-7 bg-white border border-[#3e1916]/10 p-8 md:p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#35ab9f]/15 p-3 rounded-2xl text-[#35ab9f]">
                <PartyPopper className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bricolage font-extrabold text-2xl md:text-3xl text-[#3e1916]">
                  Agendar Evento
                </h2>
                <p className="text-xs md:text-sm text-[#3e1916]/60">Completa los datos para cotizar tu fecha</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Nombre
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Apellido
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                    <input
                      type="text"
                      name="apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      placeholder="Tu apellido"
                      required
                      className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Número Telefónico
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+503 7000-0000"
                      required
                      className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      required
                      className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Ubicación del Evento
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                    <input
                      type="text"
                      name="ubicacion"
                      value={form.ubicacion}
                      onChange={handleChange}
                      placeholder="Municipio o dirección"
                      required
                      className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Tipo de Evento
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                    <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                    <select
                      name="tipo"
                      value={form.tipo}
                      onChange={handleChange}
                      className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-10 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Cumpleaños">Cumpleaños</option>
                      <option value="Boda">Boda</option>
                      <option value="Evento Empresarial">Evento Empresarial</option>
                      <option value="Fiesta Infantil">Fiesta Infantil</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                  Descripción del Evento
                </label>
                <div className="relative">
                  <FileText className="w-5 h-5 absolute left-3.5 top-3.5 text-[#3e1916]/40" />
                  <textarea
                    name="descripcion"
                    rows={3}
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Detalles sobre la cantidad estimada de personas, temática, etc..."
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e52537] hover:bg-[#c81e2e] text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-[#e52537]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Enviar Solicitud de Evento</span>
              </button>
            </form>
          </div>

        </div>

        {/* SECCIÓN INFERIOR: HISTORIAL / TABLA DE EVENTOS */}
        <div className="bg-white border border-[#3e1916]/10 rounded-3xl p-6 md:p-8 shadow-xl shadow-[#3e1916]/5 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#3e1916]/10">
            <div>
              <h3 className="font-bricolage font-extrabold text-2xl text-[#3e1916]">
                Mis Solicitudes Registradas
              </h3>
              <p className="text-xs md:text-sm text-[#3e1916]/60">
                Monitorea el estado actual de tus solicitudes de eventos
              </p>
            </div>
            <span className="bg-[#35ab9f]/10 text-[#35ab9f] font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
              Total Solicitudes: {eventos.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-extrabold text-[#3e1916]/50 uppercase tracking-wider border-b border-[#3e1916]/5">
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Contacto</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Detalles</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3e1916]/5 text-sm">
                {eventos.map((ev) => (
                  <tr key={ev.id} className="hover:bg-[#fffcf9] transition-colors">
                    <td className="py-4 px-4 font-bold text-[#3e1916] whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#fadb72] text-[#3e1916] font-bold flex items-center justify-center text-xs">
                          {ev.nombre[0]}{ev.apellido[0]}
                        </div>
                        <span>{ev.nombre} {ev.apellido}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-medium text-[#3e1916]">{ev.telefono}</div>
                      <div className="text-xs text-[#3e1916]/60">{ev.email}</div>
                    </td>
                    <td className="py-4 px-4 text-[#3e1916]/80 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#35ab9f]" />
                        <span>{ev.ubicacion}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#35ab9f] whitespace-nowrap">
                      {ev.tipo}
                    </td>
                    <td className="py-4 px-4 text-[#3e1916]/70 max-w-xs truncate">
                      {ev.descripcion || 'Sin detalles'}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${ev.estado === 'Pendiente'
                          ? 'bg-amber-100 text-amber-800'
                          : ev.estado === 'Revisado'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                          }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {ev.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}