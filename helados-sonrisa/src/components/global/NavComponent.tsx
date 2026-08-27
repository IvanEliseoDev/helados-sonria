import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Menu, X } from "lucide-react"
import logo from "../../assets/logo-sonrisas.png"

export const NavComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [visibleSection, setVisibleSection] = useState<string>(location.hash.slice(1) || "inicio")
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

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
                </div>
            )}
        </header>
    )
}