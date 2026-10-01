import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { User, LogOut } from "lucide-react"

interface UserProfileMenuProps {
    onLogout?: () => void
}

export const UserProfileMenu = ({ onLogout }: UserProfileMenuProps) => {
    const navigate = useNavigate()
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false)
    const userMenuRef = useRef<HTMLDivElement>(null)

    // Detectar clics fuera del menú para cerrarlo
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handlePageNavigation = (path: string) => {
        setIsUserMenuOpen(false)
        navigate(path)
    }

    const handleLogoutClick = () => {
        setIsUserMenuOpen(false)
        if (onLogout) {
            onLogout()
        } else {
            navigate('/auth/login')
        }
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
                        onClick={() => handlePageNavigation('/mi-perfil')}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#3e1916] hover:bg-[#35ab9f]/10 hover:text-[#35ab9f] flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                        <User className="w-4 h-4" />
                        Mi Perfil
                    </button>
                    <div className="my-1 border-t border-[#3e1916]/5" />
                    <button
                        type="button"
                        onClick={handleLogoutClick}
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