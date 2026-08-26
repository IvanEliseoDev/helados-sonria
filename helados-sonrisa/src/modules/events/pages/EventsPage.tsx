import React, { useState } from 'react'
import { NavComponent } from '../../../components/global/NavComponent'

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
    <div className="min-h-screen bg-[#fffcf9] text-[#3e1916] px-6 md:px-12 lg:px-24">
      <NavComponent />
      <div className="max-w-7xl mx-auto pt-20 space-y-16">
    
        {/* SECCIÓN SUPERIOR: GRID 2 COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Izquierda: Logo y Frase */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-20 h-20 rounded-full bg-[#4bc0bc] overflow-hidden shadow-lg flex-shrink-0">
                <img 
                  src="https://i.ibb.co/N6wf7Ccs/Captura-de-pantalla-2026-07-19-092832.png" 
                  alt="Logo Helados Sonrisa" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="font-bricolage font-bold text-3xl md:text-4xl text-[#3e1916]">
                Helados Sonrisa
              </span>
            </div>

            <h1 className="font-bricolage font-bold text-4xl md:text-5xl lg:text-6xl text-[#3e1916] leading-tight">
              Lleva la dulzura a tus momentos especiales
            </h1>

            <p className="text-base md:text-lg text-[#727877] leading-relaxed max-w-lg mx-auto lg:mx-0">
              Haz de tu fiesta, boda o evento corporativo una experiencia inolvidable con nuestro servicio de helados artesanales. Agenda tu fecha con nosotros.
            </p>
          </div>

          {/* Derecha: Formulario */}
          <div className="lg:col-span-7 bg-white border border-[#3e1916]/10 p-8 md:p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5">
            <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-[#3e1916] mb-6">
              Agendar Evento
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#4bc0bc] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    required
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#4bc0bc] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Número Telefónico
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+503 0000-0000"
                    required
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#4bc0bc] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    required
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#4bc0bc] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Ubicación del Evento
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={form.ubicacion}
                    onChange={handleChange}
                    placeholder="Lugar o municipio"
                    required
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#4bc0bc] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                    Tipo de Evento
                  </label>
                  <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#4bc0bc] transition-colors cursor-pointer"
                  >
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Boda">Boda</option>
                    <option value="Evento Empresarial">Evento Empresarial</option>
                    <option value="Fiesta Infantil">Fiesta Infantil</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  rows={3}
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Detalles sobre cantidad de personas, horario, etc..."
                  className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#4bc0bc] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e52537] hover:bg-[#c81e2e] text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                Agendar Evento
              </button>
            </form>
          </div>

        </div>

        {/* SECCIÓN INFERIOR: TABLA DE EVENTOS */}
        <div className="bg-white border border-[#3e1916]/10 rounded-3xl p-6 md:p-8 shadow-xl shadow-[#3e1916]/5 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-bricolage font-bold text-2xl md:text-3xl text-[#3e1916]">
                Eventos Agendados
              </h3>
              <p className="text-sm md:text-base text-[#727877]">
                Historial y estado de tus solicitudes recibidas
              </p>
            </div>
            <span className="bg-[#4bc0bc]/10 text-[#4bc0bc] font-bold px-4 py-2 rounded-xl text-sm">
              Total: {eventos.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#3e1916]/10 text-xs md:text-sm font-bold text-[#3e1916]/70 uppercase tracking-wider">
                  <th className="py-4 px-4">Cliente</th>
                  <th className="py-4 px-4">Contacto</th>
                  <th className="py-4 px-4">Ubicación</th>
                  <th className="py-4 px-4">Tipo</th>
                  <th className="py-4 px-4">Descripción</th>
                  <th className="py-4 px-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3e1916]/5 text-sm md:text-base">
                {eventos.map((ev) => (
                  <tr key={ev.id} className="hover:bg-[#fffcf9] transition-colors">
                    <td className="py-4 px-4 font-bold text-[#3e1916] whitespace-nowrap">
                      {ev.nombre} {ev.apellido}
                    </td>
                    <td className="py-4 px-4 text-[#727877] whitespace-nowrap">
                      <div>{ev.telefono}</div>
                      <div className="text-xs text-[#727877]/80">{ev.email}</div>
                    </td>
                    <td className="py-4 px-4 text-[#727877] whitespace-nowrap">
                      {ev.ubicacion}
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#4bc0bc] whitespace-nowrap">
                      {ev.tipo}
                    </td>
                    <td className="py-4 px-4 text-[#727877] max-w-xs truncate">
                      {ev.descripcion || 'Sin descripción'}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          ev.estado === 'Pendiente'
                            ? 'bg-amber-100 text-amber-800'
                            : ev.estado === 'Revisado'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {ev.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}