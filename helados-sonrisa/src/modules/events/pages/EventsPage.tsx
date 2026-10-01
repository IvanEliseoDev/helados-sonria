import {
  ArrowLeft
} from 'lucide-react'
import { NavComponent } from '../../../components/global/NavComponent'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { EventForm } from '../components/EventForm'
import { EventsTable } from '../components/EventsTable'
import { EventServices } from '../components/EventServices'
import { useAuthStore } from '../../../auth/store/auth.store'
import { AuthenticatedColumn } from '../components/AuthenticatedColumn'
import { useGetEventsMe } from '../hooks/useGetEventsMe'


export const EventsPage = () => {
  const {authStatus} = useAuthStore()
  const { data: eventsData } = useGetEventsMe()
  const eventCount = eventsData?.data.length ?? 0

  const navigate = useNavigate()

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
           

            {/* Ventajas del servicio */}
            <EventServices />
            
          </div>

          {/* Derecha: Formulario de Agendamiento */}
           {(authStatus === "authenticated") ? <EventForm /> : <AuthenticatedColumn />}
          

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

            {(eventCount > 0) && (<span className="bg-[#35ab9f]/10 text-[#35ab9f] font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
              Total Solicitudes: {eventCount}
            </span>)}

          </div>

          <EventsTable />

        </div>

      </main>
    </div>
  )
}