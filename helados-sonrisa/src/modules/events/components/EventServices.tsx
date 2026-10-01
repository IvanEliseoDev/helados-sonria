import { CheckCircle2 } from "lucide-react"

export const EventServices = () => {
    return (
        <div className="space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#fadb72]/40 text-[#3e1916] font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[#fadb72]">
                <span>Servicio para Eventos</span>
            </span>

            <h1 className="font-bricolage font-extrabold text-4xl md:text-5xl lg:text-6xl text-[#3e1916] leading-tight">
                Lleva la dulzura a tus <span className="text-[#35ab9f]">momentos especiales</span>
            </h1>

            <p className="text-base md:text-lg text-[#3e1916]/75 leading-relaxed">
                Haz de tu fiesta, boda o evento corporativo una experiencia inolvidable con nuestro servicio de helados artesanales y carritos temáticos.
            </p>

            <div className="bg-white border border-[#3e1916]/10 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-bricolage font-bold text-lg text-[#3e1916]">¿Qué incluye nuestro servicio?</h3>
                <ul className="space-y-3 text-sm text-[#3e1916]/80">
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#35ab9f] shrink-0" />
                        <span>Carrito temático decorado para tu evento</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#35ab9f] shrink-0" />
                        <span>Variedad de sabrosos helados 100% artesanales</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#35ab9f] shrink-0" />
                        <span>Personal capacitado para atención a tus invitados</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
