import { motion } from 'framer-motion'
import { MapPin, Navigation, Compass } from 'lucide-react'
import location from "../../../assets/helados-sonrisa-ubicacion.png"

export const LocationSection = () => {
    return (
        <motion.section
            id="ubicacion"
            initial="hidden"
            whileInView="visible"
            className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-20 bg-[#fffcf9]"
        >
            {/* Encabezado Principal */}
            <div className="text-center space-y-5 mb-16 max-w-3xl mx-auto">


                <h2 className="font-bricolage font-extrabold text-3xl md:text-6xl lg:text-6xl text-[#3e1916] leading-tight">
                    Nuestra <span className="text-[#35ab9f]">Ubicación</span>
                </h2>

                <p className="text-[#3e1916]/80 text-lg md:text-xl leading-relaxed font-normal">
                    Ven a disfrutar de tu helado favorito en un ambiente fresco y acogedor. El espacio perfecto para recargar energías en familia o con amigos.
                </p>
            </div>

            {/* Contenedor Principal (Tarjeta + Mapa) */}
            <div className="bg-white border-4 border-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#3e1916]/10 grid grid-cols-1 lg:grid-cols-12 items-stretch">

                {/* Detalles de la Tienda */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8 bg-gradient-to-br from-[#fffcf9] to-[#fadb72]/15">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-[#e52537] font-bold text-sm uppercase tracking-wider bg-[#e52537]/10 px-4 py-2 rounded-full">
                            <MapPin className="w-5 h-5" />
                            <span>Visítanos en Persona</span>
                        </div>

                        <h3 className="font-bricolage font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#3e1916] leading-tight">
                            A pasos del <br />
                            <span className="text-[#35ab9f]">Parque Acuático</span>
                        </h3>

                        <p className="text-[#3e1916]/85 text-base md:text-lg leading-relaxed">
                            Estamos ubicados en una zona privilegiada dentro del Complejo Deportivo El Cafetalón, a pocos pasos del parque acuático. El lugar ideal para refrescarte después de una tarde de deportes, caminata o diversión familiar en Santa Tecla.
                        </p>

                        {/* Bloques de Horario y Dirección */}
                        <div className="space-y-5 pt-6 border-t border-[#3e1916]/10 text-[#3e1916]">

                            <div className="flex items-start gap-4">
                                <div className="bg-[#fadb72] p-2.5 rounded-xl text-[#3e1916] shrink-0 mt-0.5">
                                    <Compass className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-[#3e1916]/60 font-bold uppercase tracking-wider">Dirección Exacta</p>
                                    <p className="font-extrabold text-base md:text-lg text-[#3e1916]">Paseo El Cafetalón, Santa Tecla, El Salvador</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <a
                            href="https://maps.app.goo.gl/zuXtRYYm77NDG5Bt5"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-[#35ab9f] hover:bg-[#2c9187] text-white font-bold px-8 py-4.5 rounded-2xl shadow-lg shadow-[#35ab9f]/25 transition-all transform hover:-translate-y-0.5 text-base md:text-lg w-full sm:w-auto"
                        >
                            <Navigation className="w-5 h-5" />
                            <span>Cómo llegar con Google Maps</span>
                        </a>
                    </div>
                </div>

                {/* Mapa / Vista Visual */}
                <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] bg-[#3e1916]">
                    <img
                        src={location}
                        alt="Ubicación en el mapa de El Cafetalón"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3e1916]/30 via-transparent to-transparent pointer-events-none" />
                </div>

            </div>
        </motion.section>
    )
}