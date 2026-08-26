import logo from "../../assets/logo-sonrisas.png"

export const FooterComponent = () => {
    return (
        <footer className="bg-[#fffcf9] border-t border-[#3e1916]/10 pt-16 pb-10 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-[#3e1916]/10">
                
                {/* Branding & Redes */}
                <div className="md:col-span-6 lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-md flex-shrink-0">
                            <img 
                                src={logo} 
                                alt="Logo Helados Sonrisa" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <span className="font-bricolage font-bold text-2xl md:text-3xl text-[#3e1916]">
                            Sonrisa
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-[#727877] leading-relaxed max-w-md">
                        Llevando frescura, dulzura y la más alta calidad en helados tradicionales a toda la familia salvadoreña.
                    </p>

                    <div className="flex gap-4 text-[#4bc0bc] pt-2">
                        {/* Facebook */}
                        <a 
                            href="#" 
                            aria-label="Facebook"
                            className="w-10 h-10 rounded-full bg-[#4bc0bc]/10 flex items-center justify-center hover:bg-[#4bc0bc] hover:text-white transition-all cursor-pointer"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a 
                            href="#" 
                            aria-label="Instagram"
                            className="w-10 h-10 rounded-full bg-[#4bc0bc]/10 flex items-center justify-center hover:bg-[#4bc0bc] hover:text-white transition-all cursor-pointer"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>

                        {/* X / Twitter */}
                        <a 
                            href="#" 
                            aria-label="Twitter / X"
                            className="w-10 h-10 rounded-full bg-[#4bc0bc]/10 flex items-center justify-center hover:bg-[#4bc0bc] hover:text-white transition-all cursor-pointer"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Navegación Empresa */}
                <div className="md:col-span-3 lg:col-span-3 space-y-4">
                    <h4 className="font-bold text-[#3e1916] text-sm md:text-base uppercase tracking-wider">
                        Empresa
                    </h4>
                    <ul className="space-y-3 text-sm md:text-base text-[#727877]">
                        <li><a href="#inicio" className="hover:text-[#4bc0bc] transition-colors">Inicio</a></li>
                        <li><a href="#nosotros" className="hover:text-[#4bc0bc] transition-colors">Nosotros</a></li>
                        <li><a href="#delicias" className="hover:text-[#4bc0bc] transition-colors">Productos</a></li>
                        <li><a href="#ubicacion" className="hover:text-[#4bc0bc] transition-colors">Ubicación</a></li>
                    </ul>
                </div>

                {/* Navegación Legales */}
                <div className="md:col-span-3 lg:col-span-4 space-y-4">
                    <h4 className="font-bold text-[#3e1916] text-sm md:text-base uppercase tracking-wider">
                        Legales
                    </h4>
                    <ul className="space-y-3 text-sm md:text-base text-[#727877]">
                        <li><a href="#" className="hover:text-[#4bc0bc] transition-colors">Privacidad</a></li>
                        <li><a href="#" className="hover:text-[#4bc0bc] transition-colors">Términos</a></li>
                        <li><a href="#" className="hover:text-[#4bc0bc] transition-colors">Preguntas Frecuentes</a></li>
                        <li><a href="#" className="hover:text-[#4bc0bc] transition-colors">Soporte</a></li>
                    </ul>
                </div>

            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto pt-8 flex justify-center text-xs md:text-sm text-[#727877] font-medium tracking-wide text-center">
                <span>© 2026 Helados Sonrisa · Todos los derechos reservados</span>
            </div>
        </footer>
    )
}