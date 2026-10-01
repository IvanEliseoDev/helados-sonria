import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { Menu, X, User, LogOut, LogIn } from "lucide-react"
import logo from "../../assets/logo-sonrisas.png"
import { useAuthStore } from "../../auth/store/auth.store"
import { useAuth } from "../../auth/hooks/useAuthMutate"

// Subcomponente independiente para el menú de usuario
const UserProfileMenu = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false)
    const userMenuRef = useRef<HTMLDivElement>(null)

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleNavigate = (path: string) => {
        setIsUserMenuOpen(false)
        navigate(path)
    }

    const handleLogout = () => {
        setIsUserMenuOpen(false)
        if (logout) logout()
        return
    }

    return (
        <div className="relative ml-2" ref={userMenuRef}>
            <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-11 h-11 rounded-full bg-[#3e1916]/5 border-2 border-[#3e1916]/20 hover:border-[#35ab9f] flex items-center justify-center text-[#3e1916] hover:text-[#35ab9f] transition-all cursor-pointer focus:outline-none"
                aria-label="Menú de usuario"
            >
                <User className="w-5 h-5" />
            </button>

            {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-lg border border-[#3e1916]/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                        type="button"
                        onClick={() => handleNavigate('/mi-perfil')}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#3e1916] hover:bg-[#35ab9f]/10 hover:text-[#35ab9f] flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                        <User className="w-4 h-4" />
                        Mi Perfil
                    </button>
                    <div className="my-1 border-t border-[#3e1916]/5" />
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    )
}

// Componente Principal de Navegación
export const NavComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { logout } = useAuth()
    const { authStatus, user } = useAuthStore()

    const [visibleSection, setVisibleSection] = useState<string>(location.hash.slice(1) || "inicio")
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    // Condición de autenticación válida
    const isAuthenticated = authStatus === "authenticated" && !!user

    const activeItem = location.pathname === "/products" || location.pathname.startsWith("/products/detail/")
        ? "catalogo"
        : location.pathname === "/eventos" || location.pathname === "/eventos/agendar"
            ? "eventos"
            : location.pathname === "/"
                ? visibleSection
                : ""

    useEffect(() => {
        if (location.pathname !== "/") return

        const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

                if (visible) setVisibleSection(visible.target.id)
            },
            { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] },
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [location.pathname])

    const navigateToSection = (sectionId: string) => {
        setIsMenuOpen(false)
        const scrollToSection = () => {
            const section = document.getElementById(sectionId)
            const header = document.querySelector('header')

            if (!section) return

            const headerHeight = header?.getBoundingClientRect().height ?? 0
            const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight

            window.scrollTo({
                top: Math.max(sectionTop, 0),
                behavior: 'smooth',
            })
        }

        if (location.pathname !== "/") {
            navigate({ pathname: "/", hash: `#${sectionId}` })
            window.setTimeout(scrollToSection, 100)
            return
        }

        navigate({ pathname: "/", hash: `#${sectionId}` })
        scrollToSection()
    }

    const handlePageNavigation = (path: string) => {
        setIsMenuOpen(false)
        navigate(path)
    }

    const handleLogoutMobile = () => {
        setIsMenuOpen(false)
        if (logout) logout()
        return
    }

    const getLinkStyle = (itemId: string) => {
        const isActive = activeItem === itemId
        return `cursor-pointer transition-colors font-semibold text-base ${isActive
                ? "text-[#35ab9f] border-b-2 border-[#35ab9f] pb-1"
                : "text-[#3e1916]/80 hover:text-[#35ab9f]"
            }`
    }

    const getMobileLinkStyle = (itemId: string) => {
        const isActive = activeItem === itemId
        return `w-full text-left py-3 px-4 rounded-xl font-bold text-base transition-colors ${isActive
                ? "bg-[#35ab9f]/10 text-[#35ab9f]"
                : "text-[#3e1916] hover:bg-[#3e1916]/5"
            }`
    }

    return (
        <header className="sticky top-0 z-50 bg-[#fffcf9]/95 backdrop-blur-md border-b border-[#3e1916]/10 px-6 py-4 md:px-12 transition-all duration-300">
            <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                
                {/* Logo y Marca */}
                <div
                    onClick={() => navigateToSection('inicio')}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-[#fadb72] shadow-sm">
                        <img src={logo} alt="Logo Helados Sonrisa" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bricolage font-extrabold text-xl md:text-2xl text-[#3e1916]">
                        Helados <span className="text-[#35ab9f]">Sonrisa</span>
                    </span>
                </div>

                {/* Navegación Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <button type="button" onClick={() => navigateToSection('inicio')} className={getLinkStyle('inicio')}>Inicio</button>
                    <button type="button" onClick={() => handlePageNavigation('/products')} className={getLinkStyle('catalogo')}>Catálogo</button>
                    <button type="button" onClick={() => handlePageNavigation('/eventos')} className={getLinkStyle('eventos')}>Eventos</button>
                    <button type="button" onClick={() => navigateToSection('ubicacion')} className={getLinkStyle('ubicacion')}>Ubicación</button>
                    <button type="button" onClick={() => navigateToSection('contacto')} className={getLinkStyle('contacto')}>Contacto</button>

                    {/* Menú de Usuario Desktop (Solo si está autenticado) */}
                    {isAuthenticated ? (
                        <UserProfileMenu />
                    ) : (
                        <button
                            type="button"
                            onClick={() => handlePageNavigation('/auth/login')}
                            className="bg-[#35ab9f] hover:bg-[#2e968b] text-white px-5 py-2.5 rounded-xl font-bold transition-all cursor-pointer shadow-sm"
                        >
                            Iniciar Sesión
                        </button>
                    )}
                </nav>

                {/* Botón Menú Móvil */}
                <button 
                    type="button" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden text-[#3e1916] p-2 rounded-xl bg-[#3e1916]/5 hover:bg-[#3e1916]/10 transition-colors cursor-pointer"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Menú Desplegable Móvil */}
            {isMenuOpen && (
                <div className="md:hidden pt-4 pb-2 px-2 space-y-1 border-t border-[#3e1916]/10 mt-4">
                    <button type="button" onClick={() => navigateToSection('inicio')} className={getMobileLinkStyle('inicio')}>Inicio</button>
                    <button type="button" onClick={() => handlePageNavigation('/products')} className={getMobileLinkStyle('catalogo')}>Catálogo</button>
                    <button type="button" onClick={() => handlePageNavigation('/eventos')} className={getMobileLinkStyle('eventos')}>Eventos</button>
                    <button type="button" onClick={() => navigateToSection('ubicacion')} className={getMobileLinkStyle('ubicacion')}>Ubicación</button>
                    <button type="button" onClick={() => navigateToSection('contacto')} className={getMobileLinkStyle('contacto')}>Contacto</button>
                    
                    {/* Opciones de Usuario en Móvil */}
                    <div className="pt-2 mt-2 border-t border-[#3e1916]/10 space-y-1">
                        {isAuthenticated ? (
                            <>
                                <button 
                                    type="button" 
                                    onClick={() => handlePageNavigation('/mi-perfil')} 
                                    className="w-full text-left py-3 px-4 rounded-xl font-bold text-base text-[#3e1916] hover:bg-[#3e1916]/5 flex items-center gap-3 transition-colors cursor-pointer"
                                >
                                    <User className="w-5 h-5 text-[#35ab9f]" />
                                    Mi Perfil
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleLogoutMobile} 
                                    className="w-full text-left py-3 px-4 rounded-xl font-bold text-base text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-colors cursor-pointer"
                                >
                                    <LogOut className="w-5 h-5 text-rose-500" />
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <button 
                                type="button" 
                                onClick={() => handlePageNavigation('/auth/login')} 
                                className="w-full text-left py-3 px-4 rounded-xl font-bold text-base text-[#35ab9f] hover:bg-[#35ab9f]/10 flex items-center gap-3 transition-colors cursor-pointer"
                            >
                                <LogIn className="w-5 h-5 text-[#35ab9f]" />
                                Iniciar Sesión
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}