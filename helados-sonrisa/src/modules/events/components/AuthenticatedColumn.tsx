import { User, UserPlus, ShieldCheck, CalendarCheck, Clock } from 'lucide-react'
import { useNavigate } from 'react-router'

export const AuthenticatedColumn = () => {

    const navigate = useNavigate()

    return (
        <div className="lg:col-span-7 bg-white border border-[#3e1916]/10 p-8 md:p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5 flex flex-col justify-between h-full">

            {/* Cabecera */}
            <div className="flex items-start gap-4">
                <div>
                    <h2 className="font-bricolage font-extrabold text-2xl md:text-3xl text-[#3e1916] tracking-tight">
                        Inicia sesión
                    </h2>
                    <p className="text-sm text-[#3e1916]/60 mt-1 leading-relaxed">
                        Inicia sesión o regístrate para gestionar tus eventos y cotizaciones.
                    </p>
                </div>
            </div>

            {/* Elemento central para llenar el espacio vacío con valor */}
            <div className="my-8 py-6 px-6 bg-[#35ab9f]/5 rounded-2xl border border-[#35ab9f]/10 flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#35ab9f]">
                    ¿Por qué tener una cuenta?
                </p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-[#3e1916]/80 font-medium">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-[#35ab9f]">
                            <CalendarCheck className="w-4 h-4" />
                        </div>
                        <span>Agenda y personaliza carritos temáticos al instante</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#3e1916]/80 font-medium">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-[#35ab9f]">
                            <Clock className="w-4 h-4" />
                        </div>
                        <span>Monitorea el estado de tus solicitudes en tiempo real</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#3e1916]/80 font-medium">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-[#35ab9f]">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span>100% seguro y exclusivo para eventos</span>
                    </div>
                </div>
            </div>

            {/* Botones abajo */}
            <div className="flex flex-col gap-3">
                <button 
                    type="button"
                    className="cursor-pointer w-full py-3.5 px-6 bg-[#35ab9f] text-white font-semibold rounded-2xl shadow-lg shadow-[#35ab9f]/20 hover:bg-[#2e948a] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                    onClick={() => navigate("/auth/login")}
                >
                    <User className="w-5 h-5" />
                    Iniciar sesión
                </button>
                
                <button 
                    type="button"
                    className="cursor-pointer w-full py-3.5 px-6 bg-red-50 text-red-600 font-semibold rounded-2xl border border-red-100 hover:bg-red-100 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                    onClick={() => navigate("/auth/register")}
                >
                    <UserPlus className="w-5 h-5" />
                    Registrarse
                </button>
            </div>
            
        </div>
    )
}