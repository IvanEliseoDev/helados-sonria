import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import logo from "../../assets/logo-sonrisas.png"

export const NavComponent = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [visibleSection, setVisibleSection] = useState<string>(location.hash.slice(1) || "inicio")
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
                const visibleSection = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

                if (visibleSection) setVisibleSection(visibleSection.target.id)
            },
            { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] },
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [location.pathname])

    const navigateToSection = (sectionId: string) => {
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

    const getLinkStyle = (itemId: string) => {
        const isActive = activeItem === itemId
        return `cursor-pointer transition-colors font-medium text-sm ${isActive
                ? "text-[#4bc0bc] font-semibold border-b-2 border-[#4bc0bc] pb-1"
                : "text-[#3e1916]/80 hover:text-[#4bc0bc]"
            }`
    }

    return (
        <header className="sticky top-0 z-50 bg-[#fffcf9]/90 backdrop-blur-md border-b border-[#3e1916]/5 px-6 py-4 md:px-12 flex justify-between items-center transition-all duration-300">
            <div
                onClick={() => navigateToSection('inicio')}
                className="flex items-center gap-3 cursor-pointer"
            >
                <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden ">
                    <img src={logo} alt="Logo Helados Sonrisa" className="w-full h-full object-cover" />
                </div>
                <span className="font-['Bricolage_Grotesque',sans-serif] font-bold text-xl text-[#3e1916]">
                    Helados <span className="text-[#4bc0bc]">Sonrisa</span>
                </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                <button type="button" onClick={() => navigateToSection('inicio')} className={getLinkStyle('inicio')}>Inicio</button>
                <button type="button" onClick={() => navigate('/products')} className={getLinkStyle('catalogo')}>Catálogo</button>
                <button type="button" onClick={() => navigate('/eventos')} className={getLinkStyle('eventos')}>Eventos</button>
                <button type="button" onClick={() => navigateToSection('contacto')} className={getLinkStyle('contacto')}>Contacto</button>
            </nav>

            <button type="button" className="md:hidden text-[#3e1916] p-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </header>
    )
}