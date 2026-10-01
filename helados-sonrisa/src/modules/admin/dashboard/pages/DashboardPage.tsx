import { Users, Clock, XCircle, AlertCircle, ChevronRight, Calendar, TrendingUp, ShieldAlert, User } from 'lucide-react'

export const DashboardPage = () => {
  const pendingEvents = [
    { id: 1, client: 'María Fernanda Gómez', eventType: 'Cumpleaños Infantil', date: '15 Oct 2026', guests: '35 personas', status: 'Pendiente' },
    { id: 2, client: 'Carlos Roberto Mendoza', eventType: 'Aniversario', date: '18 Oct 2026', guests: '50 personas', status: 'Pendiente' },
    { id: 3, client: 'Ana Sofía Rivas', eventType: 'Fiesta Sorpresa', date: '22 Oct 2026', guests: '25 personas', status: 'Pendiente' },
  ]

  return (
    <div className="space-y-8 font-bricolage">
      
      {/* Banner de Bienvenida Artesanal */}
      <div className="relative overflow-hidden bg-linear-to-r from-[#35ab9f] via-[#289086] to-[#1b7a73] p-6 sm:p-8 rounded-3xl text-white shadow-lg shadow-[#35ab9f]/15">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute right-1/3 top-0 w-24 h-24 bg-[#e52537]/20 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-yellow-200 border border-white/20">
              <User className="w-3.5 h-3.5" />
              Panel de Control
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              ¡Bienvenido a Heladería Sonrisa! 
            </h1>
            <p className="text-xl sm:text-sm text-white/85 font-medium max-w-xl">
              Gestiona el pulso de tu heladería artesanal, revisa reservaciones pendientes y mantén la alegría fluyendo.
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas Rediseñadas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Total Clientes */}
        <div className="bg-white p-6 rounded-3xl border border-[#3e1916]/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#35ab9f]/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/50">Total Clientes</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#3e1916]">1,248</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#35ab9f] bg-[#35ab9f]/10 px-2.5 py-1 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5" /> +12% este mes
              </span>
            </div>
            <div className="w-14 h-14 bg-linear-to-br from-[#35ab9f]/20 to-[#35ab9f]/5 rounded-2xl flex items-center justify-center text-[#35ab9f] border border-[#35ab9f]/20 shadow-xs">
              <Users className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Eventos Pendientes */}
        <div className="bg-white p-6 rounded-3xl border border-[#3e1916]/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/50">Eventos Pendientes</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#3e1916]">12</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/50">
                <ShieldAlert className="w-3.5 h-3.5" /> Requieren revisión
              </span>
            </div>
            <div className="w-14 h-14 bg-linear-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-200/60 shadow-xs">
              <Clock className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Eventos Cancelados */}
        <div className="bg-white p-6 rounded-3xl border border-[#3e1916]/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/50">Eventos Cancelados</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#3e1916]">3</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200/50">
                Este mes
              </span>
            </div>
            <div className="w-14 h-14 bg-linear-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center text-red-600 border border-red-200/60 shadow-xs">
              <XCircle className="w-7 h-7" />
            </div>
          </div>
        </div>

      </div>

      {/* Sección inferior: Lista de eventos pendientes a revisar con estilo artesanal */}
      <div className="bg-white rounded-3xl border border-[#3e1916]/10 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-[#3e1916]/10 flex items-center justify-between bg-[#fffcf9]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#35ab9f]/10 text-[#35ab9f] flex items-center justify-center border border-[#35ab9f]/20">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#3e1916]">Eventos Pendientes a Revisar</h2>
              <p className="text-xs text-[#3e1916]/60 font-medium">Solicitudes recientes enviadas por clientes desde la web.</p>
            </div>
          </div>
          <button className="text-xs font-bold text-[#35ab9f] hover:text-[#289086] hover:underline cursor-pointer bg-[#35ab9f]/10 px-3.5 py-2 rounded-xl transition-all">
            Ver todos
          </button>
        </div>

        <div className="divide-y divide-[#3e1916]/10">
          {pendingEvents.map((event) => (
            <div key={event.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#fffcf9] transition-colors">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#35ab9f]/10 text-[#35ab9f] flex items-center justify-center shrink-0 border border-[#35ab9f]/20 shadow-xs mt-0.5">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#3e1916]">{event.client}</h4>
                  <p className="text-xs text-[#3e1916]/60 font-semibold">
                    {event.eventType} • <span className="text-[#3e1916]/80 font-bold bg-[#3e1916]/5 px-2 py-0.5 rounded-md">{event.guests}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5">
                <div className="text-right space-y-1">
                  <span className="text-xs font-bold text-[#3e1916] block">{event.date}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                    <Clock className="w-3 h-3" /> {event.status}
                  </span>
                </div>
                <button className="bg-[#35ab9f] hover:bg-[#2e948a] text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-[#35ab9f]/20 cursor-pointer flex items-center gap-1.5 transform hover:-translate-y-0.5">
                  <span>Revisar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}