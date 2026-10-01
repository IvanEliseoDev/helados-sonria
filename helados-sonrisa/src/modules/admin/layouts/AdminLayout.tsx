import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router'
import { 
  LayoutDashboard, Users, Users2, PartyPopper, IceCream2, 
  LogOut, Menu, X, User, ChevronLeft, ChevronRight
} from 'lucide-react'
import logo from "../../../assets/logo-sonrisas.png"

export const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Inicio', path: '/admin/inicio', icon: LayoutDashboard },
    { name: 'Clientes', path: '/admin/clientes', icon: Users2 },
    { name: 'Empleados', path: '/admin/empleados', icon: Users },
    { name: 'Eventos', path: '/admin/eventos', icon: PartyPopper },
    { name: 'Productos', path: '/admin/productos', icon: IceCream2 },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-[#fffcf9] flex flex-col md:flex-row relative font-bricolage selection:bg-[#35ab9f]/20">
      
      {/* ================= BARRA MÓVIL SUPERIOR ================= */}
      <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-[#3e1916]/10 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
          <span className="font-bold text-lg text-[#3e1916] tracking-tight">Helados Sonrisa</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#3e1916] rounded-xl hover:bg-[#3e1916]/5 focus:outline-none cursor-pointer transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* ================= SIDEBAR (Escritorio y Móvil desplegable) ================= */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 bg-white border-r border-[#3e1916]/10 
        flex flex-col justify-between p-4 md:py-6 transition-all duration-300 ease-in-out shadow-sm md:shadow-none
        ${isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-72'}
      `}>
        {/* PARTE SUPERIOR: Logo, Botón Colapsar y Navegación */}
        <div className="space-y-6">
          
          {/* Logo y Botón de colapsar (Escritorio) */}
          <div className="flex items-center justify-between relative px-2">
            <div className={`flex items-center gap-1 overflow-hidden transition-all ${isCollapsed ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
              </div>
              <div className="leading-tight whitespace-nowrap">
                <h2 className="font-bold text-base text-[#3e1916] tracking-tight">
                  Helados Sonrisa
                </h2>
              </div>
            </div>

            {/* Botón para contraer/expandir sidebar en desktop */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-[#3e1916]/15 rounded-full items-center justify-center text-[#3e1916]/70 hover:text-[#3e1916] hover:bg-[#fffcf9] shadow-sm cursor-pointer transition-transform hover:scale-110 z-10"
              title={isCollapsed ? "Expandir menú" : "Contraer menú"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Menú de enlaces */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group relative ${
                    active 
                      ? 'bg-linear-to-r from-[#35ab9f] to-[#2e948a] text-white shadow-md shadow-[#35ab9f]/25'
                      : 'text-[#3e1916]/70 hover:bg-[#3e1916]/5 hover:text-[#3e1916]'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-[#35ab9f]'}`} />
                  <span className={`whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'opacity-100'}`}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* PARTE INFERIOR: Perfil de Usuario (Icono a la derecha / Abajo) y Cerrar Sesión */}
        <div className="pt-4 border-t border-[#3e1916]/10 space-y-3">
          
          {/* Tarjeta de Usuario / Icono inferior derecho */}
          <div className={`flex items-center justify-between p-2 rounded-2xl bg-[#fffcf9] border border-[#3e1916]/10 ${isCollapsed ? 'md:justify-center' : ''}`}>
            <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'md:hidden' : ''}`}>
              <div className="w-9 h-9 rounded-xl bg-[#35ab9f]/15 border border-[#35ab9f]/30 flex items-center justify-center text-[#35ab9f] shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-[#3e1916] truncate">Administrador</p>
                <p className="text-[10px] text-[#3e1916]/50 truncate">admin@sonrisas.com</p>
              </div>
            </div>
            
            {/* Si está colapsado, solo muestra el icono estilizado abajo */}
            {isCollapsed && (
              <div className="hidden md:flex w-9 h-9 rounded-xl bg-[#35ab9f]/15 border border-[#35ab9f]/30 items-center justify-center text-[#35ab9f]" title="Administrador (admin@sonrisas.com)">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <Link
            to="/login"
            title={isCollapsed ? "Cerrar Sesión" : undefined}
            className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50/80 transition-colors w-full ${isCollapsed ? 'md:justify-center' : ''}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : ''}`}>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="fixed inset-0 bg-[#3e1916]/30 z-30 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-8 lg:p-10 w-full mx-auto flex-1 ">
          <Outlet />
        </div>
      </main>

    </div>
  )
}