import { useState } from "react";
import { Eye, CheckCircle2, XCircle, Calendar, MapPin, Clock, Tag, X, Trash2 } from "lucide-react";
import type { eventStatus } from "../../../events/interfaces/event.interface";
import { useAcceptEvent, useDeleteEvent, useGetAllEvents, useRejectEvent } from "../../../events/hooks/useAdminEvents";

export interface EventItem {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    status: eventStatus;
    category?: string;
}

interface EventsTableProps {
    events: EventItem[];
    onUpdateStatus: (id: string, newStatus: 'Aceptado' | 'Rechazado') => void;
    onViewDetail: (event: EventItem) => void;
    onDelete: (id: string) => void;
}

export const EventsTable = ({ events, onUpdateStatus, onViewDetail, onDelete }: EventsTableProps) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-xs font-extrabold text-[#3e1916]/50 uppercase tracking-wider border-b border-[#3e1916]/10 pb-3">
                        <th className="py-3 px-4">Evento</th>
                        <th className="py-3 px-4">Fecha y Hora</th>
                        <th className="py-3 px-4">Ubicación</th>
                        <th className="py-3 px-4 text-center">Estado</th>
                        <th className="py-3 px-4 text-center">Acciones Rápidas</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#3e1916]/5 text-sm">
                    {events.map((event) => {
                        const isAccepted = event.status === 'Aceptado';
                        const isRejected = event.status === 'Rechazado' || event.status === 'Cancelado';

                        return (
                            <tr key={event._id} className="hover:bg-[#fff9f5] transition-colors group">
                                <td className="py-4 px-4 font-bold text-[#3e1916] whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-base font-extrabold text-[#3e1916]">{event.title}</span>
                                        <span className="text-xs text-[#3e1916]/60 font-medium flex items-center gap-1 mt-0.5">
                                            <Tag className="w-3 h-3 text-[#35ab9f]" /> {event.category || 'General'}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5 text-xs text-[#3e1916]/80 font-medium">
                                        <Calendar className="w-3.5 h-3.5 text-[#35ab9f]" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-[#3e1916]/60 mt-0.5">
                                        <Clock className="w-3.5 h-3.5 text-[#3e1916]/40" />
                                        <span>{event.time}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#3e1916]/80">
                                        <MapPin className="w-3.5 h-3.5 text-[#35ab9f]" />
                                        <span className="truncate max-w-xs">{event.location}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                            isAccepted
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : isRejected
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}
                                    >
                                        {event.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Botón Ver Detalle */}
                                        <button
                                            onClick={() => onViewDetail(event)}
                                            title="Ver detalle"
                                            className="p-2 rounded-xl bg-[#35ab9f]/10 text-[#35ab9f] hover:bg-[#35ab9f] hover:text-white transition-all cursor-pointer shadow-sm"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        {/* Botón Aceptar */}
                                        <button
                                            onClick={() => onUpdateStatus(event._id, 'Aceptado')}
                                            title="Aceptar evento"
                                            className="p-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                        {/* Botón Cancelar */}
                                        <button
                                            onClick={() => onUpdateStatus(event._id, 'Rechazado')}
                                            title="Rechazar evento"
                                            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-sm"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(event._id)}
                                            title="Eliminar evento"
                                            className="p-2 rounded-xl bg-[#3e1916]/5 text-[#3e1916]/70 hover:bg-[#3e1916] hover:text-white transition-all cursor-pointer shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// Modal Amplio para Ver Detalle del Evento
interface EventDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: EventItem | null;
}

export const EventDetailModal = ({ isOpen, onClose, event }: EventDetailModalProps) => {
    if (!isOpen || !event) return null;

    const isAccepted = event.status === 'Aceptado';
    const isRejected = event.status === 'Rechazado' || event.status === 'Cancelado';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-[#3e1916]/10 space-y-6 relative animate-in fade-in zoom-in duration-200">
                {/* Cabecera del Modal */}
                <div className="flex items-start justify-between border-b border-[#3e1916]/10 pb-4">
                    <div className="space-y-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#35ab9f]/10 text-[#35ab9f]">
                            <Tag className="w-3 h-3" /> {event.category || 'General'}
                        </span>
                        <h2 className="text-xl md:text-2xl font-extrabold text-[#3e1916]">
                            {event.title}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-[#3e1916]/5 rounded-xl transition-colors cursor-pointer text-[#3e1916]/70"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Contenido Detallado */}
                <div className="space-y-6 text-[#3e1916]">
                    <div>
                        <h4 className="text-xs font-bold text-[#3e1916]/50 uppercase tracking-wider mb-2">Descripción del Evento</h4>
                        <p className="text-sm text-[#3e1916]/80 bg-[#fffcf9] p-4 rounded-2xl border border-[#3e1916]/5 leading-relaxed">
                            {event.description || 'No hay una descripción detallada disponible para este evento.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#fffcf9] border border-[#3e1916]/5">
                            <div className="p-3 rounded-xl bg-[#35ab9f]/10 text-[#35ab9f]">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#3e1916]/50 uppercase">Fecha y Hora</span>
                                <span className="text-sm font-extrabold text-[#3e1916]">{event.date} - {event.time}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#fffcf9] border border-[#3e1916]/5">
                            <div className="p-3 rounded-xl bg-[#35ab9f]/10 text-[#35ab9f]">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#3e1916]/50 uppercase">Ubicación</span>
                                <span className="text-sm font-extrabold text-[#3e1916]">{event.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-bold text-[#3e1916]/50 uppercase">Estado Actual</span>
                        <span
                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${
                                isAccepted
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : isRejected
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                            }`}
                        >
                            {event.status}
                        </span>
                    </div>
                </div>

                {/* Pie del Modal */}
                <div className="flex justify-end pt-4 border-t border-[#3e1916]/10">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#3e1916] hover:bg-[#3e1916]/80 transition-colors cursor-pointer shadow-md"
                    >
                        Cerrar Detalle
                    </button>
                </div>
            </div>
        </div>
    );
};

// Página Principal de Eventos
const formatEventDate = (value: string) => {
    const date = new Date(`${value.slice(0, 10)}T00:00:00`);
    return Number.isNaN(date.getTime())
        ? value
        : new Intl.DateTimeFormat("es-SV", { day: "2-digit", month: "short", year: "numeric" }).format(date);
};

export const AdminEventsPage = () => {
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const eventsQuery = useGetAllEvents();
    const acceptEvent = useAcceptEvent();
    const rejectEvent = useRejectEvent();
    const deleteEvent = useDeleteEvent();
    const events: EventItem[] = (eventsQuery.data?.data ?? []).map((event) => ({
        _id: event._id,
        title: event.name,
        description: event.description,
        date: formatEventDate(event.initDate),
        time: event.eventTime ?? "Sin hora",
        location: event.location,
        status: event.status,
        category: event.eventType,
    }));

    const handleUpdateStatus = (id: string, newStatus: 'Aceptado' | 'Rechazado') => {
        if (newStatus === "Aceptado") acceptEvent.mutate(id);
        else rejectEvent.mutate(id);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("¿Estás seguro de eliminar este evento? Esta acción no se puede deshacer.")) {
            deleteEvent.mutate(id);
        }
    };

    const handleViewDetail = (event: EventItem) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 md:p-8 space-y-6 w-full mx-auto">
            {/* Encabezado */}
            <div>
                <h1 className="font-extrabold text-2xl md:text-3xl text-[#3e1916]">
                    Calendario de Eventos
                </h1>
                <p className="text-xs md:text-sm text-[#3e1916]/60">
                    Panel exclusivo de supervisión y control de actividades programadas.
                </p>
            </div>

            {/* Contenedor de la Tabla con Estilo Diferenciado y Llamativo */}
            <div className="bg-linear-to-br from-white via-white to-[#fffcf9] border-2 border-[#35ab9f]/20 rounded-3xl p-6 shadow-xl shadow-[#35ab9f]/5">
                {eventsQuery.isLoading ? (
                    <p className="py-8 text-center text-sm text-[#3e1916]/60">Cargando eventos...</p>
                ) : eventsQuery.isError ? (
                    <p className="py-8 text-center text-sm text-red-600">No se pudieron cargar los eventos.</p>
                ) : events.length === 0 ? (
                    <p className="py-8 text-center text-sm text-[#3e1916]/60">No hay eventos registrados.</p>
                ) : (
                    <EventsTable
                        events={events}
                        onUpdateStatus={handleUpdateStatus}
                        onViewDetail={handleViewDetail}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* Modal de Detalle Amplio */}
            <EventDetailModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />
        </div>
    );
};