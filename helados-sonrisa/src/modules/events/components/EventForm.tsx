import { ArrowRight, Calendar, ChevronDown, Clock, FileText, MapPin, PartyPopper, User, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'
import type { EventReq } from '../interfaces/event.create.request'
import { useCreateEvent } from '../hooks/useEventsMeMutate'
import { useGetEventsMe } from '../hooks/useGetEventsMe'

// Función auxiliar para obtener la fecha actual en formato YYYY-MM-DD (hora local)
const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const EventForm = () => {
    const { mutateAsync: reserveEvent, isPending } = useCreateEvent();
    const { data: myEventsData } = useGetEventsMe();
    const myEvents = myEventsData?.data || [];

    const [form, setForm] = useState<EventReq>({
        name: '',
        description: '',
        eventTime: '',
        initDate: '',
        location: '',
        eventType: 'Cumpleaños'
    });

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setErrorMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        // 1. Validar que no sea fecha pasada
        const todayStr = getTodayString();
        if (form.initDate && form.initDate < todayStr) {
            setErrorMsg("No puedes agendar un evento en fechas pasadas.");
            return;
        }

        // 2. Validar que el cliente no tenga ya un evento activo en el mismo día
        const dateIsTaken = myEvents.some(ev => {
            if (!ev.initDate) return false;
            const evDateStr = new Date(ev.initDate).toISOString().split('T')[0];
            return evDateStr === form.initDate && ev.status !== 'Cancelado';
        });

        if (dateIsTaken) {
            setErrorMsg(`Ya tienes un evento registrado para el día ${form.initDate}. No puedes reservar dos eventos en la misma fecha.`);
            return;
        }

        try {
            console.log("Data lista para enviar:", form);
            await reserveEvent(form);
            
            // Limpieza del formulario
            setForm({
                name: '',
                description: '',
                eventTime: '',
                initDate: '',
                location: '',
                eventType: 'Cumpleaños'
            });
        } catch (error) {
            console.error("Error al crear evento:", error);
        }
    };

    return (
        <div className="lg:col-span-7 bg-white border border-[#3e1916]/10 p-8 md:p-10 rounded-3xl shadow-xl shadow-[#3e1916]/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#35ab9f]/15 p-3 rounded-2xl text-[#35ab9f]">
                    <PartyPopper className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="font-bricolage font-extrabold text-2xl md:text-3xl text-[#3e1916]">
                        Agendar Evento
                    </h2>
                    <p className="text-xs md:text-sm text-[#3e1916]/60">Completa los datos para cotizar tu fecha</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {/* Nombre del evento */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                        Nombre del evento
                    </label>
                    <div className="relative">
                        <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Aniversario Tech Hub..."
                            required
                            className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                        />
                    </div>
                </div>

                {/* Hora de inicio y Fecha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                            Hora de inicio del evento
                        </label>
                        <div className="relative">
                            <Clock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                            <input
                                type="time"
                                name="eventTime"
                                value={form.eventTime}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                            Fecha del evento
                        </label>
                        <div className="relative">
                            <Calendar className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                            <input
                                type="date"
                                name="initDate"
                                min={getTodayString()}
                                value={form.initDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Ubicación y Tipo de Evento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                            Ubicación del Evento
                        </label>
                        <div className="relative">
                            <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Santa Tecla..."
                                required
                                className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                            Tipo de Evento
                        </label>
                        <div className="relative">
                            <Calendar className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                            <select
                                name="eventType"
                                value={form.eventType}
                                onChange={handleChange}
                                className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-10 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="Cumpleaños">Cumpleaños</option>
                                <option value="Boda">Boda</option>
                                <option value="Evento Empresarial">Evento Empresarial</option>
                                <option value="Fiesta Infantil">Fiesta Infantil</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">
                        Descripción del Evento
                    </label>
                    <div className="relative">
                        <FileText className="w-5 h-5 absolute left-3.5 top-3.5 text-[#3e1916]/40" />
                        <textarea
                            name="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Detalles sobre el evento..."
                            className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-[#35ab9f] focus:ring-2 focus:ring-[#35ab9f]/20 transition-all resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Botón de Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#e52537] hover:bg-[#c81e2e] text-white font-extrabold text-base py-4 rounded-xl shadow-lg shadow-[#e52537]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                    <ArrowRight className="w-5 h-5" />
                    <span>{isPending ? "Enviando solicitud..." : "Enviar Solicitud de Evento"}</span>
                </button>
            </form>
        </div>
    );
};