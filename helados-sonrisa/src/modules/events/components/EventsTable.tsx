import { useState } from "react";
import { Clock, MapPin, MoreVertical, Eye, Edit, Trash2, Calendar, ChevronDown, FileText, User, X, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { useGetEventsMe } from "../hooks/useGetEventsMe";
import { useCancelMyEvent, useUpdateMyEvent } from "../hooks/useEventsMeMutate";
import { useGetEventById } from "../hooks/useGetEventById";
import type { UpdateMyEventReq } from "../interfaces/event.update.request";
import type { Datum } from "../interfaces/responses/events.me.response.interface";

// Función auxiliar para obtener la fecha actual en formato YYYY-MM-DD (hora local)
const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const EventsTable = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetEventsMe();
    const { mutate: cancelEvent, isPending: isCancelling } = useCancelMyEvent();
    
    const myEvents = data?.data;
    const isEmpty = !myEvents && isLoading;

    // Estados para el menú de opciones (3 puntos) por fila
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Estado para el modal de edición
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    // Estado para el modal de confirmación de cancelación
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [eventToCancelId, setEventToCancelId] = useState<string | null>(null);

    return (
        <div className="relative">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs font-extrabold text-[#3e1916]/50 uppercase tracking-wider border-b border-[#3e1916]/5">
                            <th className="py-3 px-4">Evento</th>
                            <th className="py-3 px-4">Contacto</th>
                            <th className="py-3 px-4">Ubicación</th>
                            <th className="py-3 px-4">Tipo</th>
                            <th className="py-3 px-4">Fecha y Hora</th>
                            <th className="py-3 px-4 text-center">Estado</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    {(!isEmpty && myEvents !== undefined) && (
                        <tbody className="divide-y divide-[#3e1916]/5 text-sm">
                            {myEvents.map((event) => {
                                const formattedDate = event.initDate 
                                    ? new Date(event.initDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }) 
                                    : '';

                                return (
                                    <tr key={event._id} className="hover:bg-[#fffcf9] transition-colors relative">
                                        <td className="py-4 px-4 font-bold text-[#3e1916] whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <span>{event.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="font-medium text-[#3e1916]">{event.user.phone}</div>
                                            <div className="text-xs text-[#3e1916]/60">{event.user.email}</div>
                                        </td>
                                        <td className="py-4 px-4 text-[#3e1916]/80 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4 text-[#35ab9f]" />
                                                <span>{event.location}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-semibold text-[#35ab9f] whitespace-nowrap">
                                            {event.eventType}
                                        </td>
                                        <td className="py-4 px-4 text-[#3e1916]/70 whitespace-nowrap">
                                            <div className="font-medium text-[#3e1916]">{formattedDate}</div>
                                            <div className="text-xs text-[#3e1916]/60">{event.eventTime}</div>
                                        </td>
                                        <td className="py-4 px-4 text-center whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                    event.status === 'Pendiente'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : event.status === 'Aceptado'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-emerald-100 text-emerald-800'
                                                }`}
                                            >
                                                <Clock className="w-3.5 h-3.5" />
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center whitespace-nowrap relative">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === event._id ? null : event._id)}
                                                className="p-2 hover:bg-[#3e1916]/5 rounded-xl transition-colors cursor-pointer"
                                            >
                                                <MoreVertical className="w-5 h-5 text-[#3e1916]/70" />
                                            </button>

                                            {openMenuId === event._id && (
                                                <>
                                                    <div 
                                                        className="fixed inset-0 z-40" 
                                                        onClick={() => setOpenMenuId(null)}
                                                    />
                                                    <div className="absolute right-12 top-12 w-40 bg-white border border-[#3e1916]/10 rounded-2xl shadow-xl z-50 py-2 flex flex-col text-left">
                                                        <button
                                                            onClick={() => {
                                                                navigate(`/eventos/agendar/ver/${event._id}`);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#3e1916] hover:bg-[#35ab9f]/10 hover:text-[#35ab9f] transition-colors cursor-pointer"
                                                        >
                                                            <Eye className="w-4 h-4" /> Ver
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedEventId(event._id);
                                                                setIsEditModalOpen(true);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#3e1916] hover:bg-[#35ab9f]/10 hover:text-[#35ab9f] transition-colors cursor-pointer"
                                                        >
                                                            <Edit className="w-4 h-4" /> Editar
                                                        </button>
                                                        {event.status !== 'Cancelado' && (
                                                            <button
                                                                onClick={() => {
                                                                    setEventToCancelId(event._id);
                                                                    setIsConfirmModalOpen(true);
                                                                    setOpenMenuId(null);
                                                                }}
                                                                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                            >
                                                                <Trash2 className="w-4 h-4" /> Cancelar
                                                            </button>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </div>

            {/* Modal de Edición */}
            {isEditModalOpen && selectedEventId && (
                <EditEventModal
                    eventId={selectedEventId}
                    isOpen={isEditModalOpen}
                    existingEvents={myEvents || []}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedEventId(null);
                    }}
                />
            )}

            {/* Modal de Confirmación para Cancelar */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white border border-[#3e1916]/10 p-6 md:p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-xl text-[#3e1916]">
                                    ¿Cancelar evento?
                                </h3>
                                <p className="text-xs text-[#3e1916]/60">Esta acción no se puede deshacer</p>
                            </div>
                        </div>
                        <p className="text-sm text-[#3e1916]/80 mb-6">
                            ¿Estás seguro de que deseas cancelar este evento? Dejará de estar activo en tu lista.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsConfirmModalOpen(false);
                                    setEventToCancelId(null);
                                }}
                                className="px-5 py-2.5 rounded-xl border border-[#3e1916]/15 text-sm font-bold text-[#3e1916]/70 hover:bg-[#3e1916]/5 transition-colors cursor-pointer"
                            >
                                Volver
                            </button>
                            <button
                                type="button"
                                disabled={isCancelling}
                                onClick={() => {
                                    if (eventToCancelId) {
                                        cancelEvent(eventToCancelId, {
                                            onSuccess: () => {
                                                setIsConfirmModalOpen(false);
                                                setEventToCancelId(null);
                                            }
                                        });
                                    }
                                }}
                                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
                            >
                                {isCancelling ? "Cancelando..." : "Sí, cancelar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Subcomponente interno para manejar la lógica del formulario y carga de datos en el modal
interface EditEventModalProps {
    eventId: string;
    isOpen: boolean;
    existingEvents: Datum[];
    onClose: () => void;
}

const EditEventModal = ({ eventId, isOpen, existingEvents, onClose }: EditEventModalProps) => {
    const { data: eventData, isLoading } = useGetEventById(eventId);
    const { mutateAsync: updateEvent, isPending } = useUpdateMyEvent();

    const [formChanges, setFormChanges] = useState<Partial<UpdateMyEventReq>>({});
    const event = eventData?.data;
    const form: UpdateMyEventReq = {
        name: event?.name || '',
        description: event?.description || '',
        eventTime: event?.eventTime || '',
        initDate: event?.initDate ? new Date(event.initDate).toISOString().split('T')[0] : '',
        location: event?.location || '',
        eventType: event?.eventType || 'Cumpleaños',
        ...formChanges,
    };

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormChanges((previous) => ({ ...previous, [e.target.name]: e.target.value }));
        setErrorMsg(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        // Validar fecha pasada
        const todayStr = getTodayString();
        if (form.initDate && form.initDate < todayStr) {
            setErrorMsg("No puedes programar un evento en fechas pasadas.");
            return;
        }

        // Validar si el cliente ya tiene otro evento registrado en ese mismo día (excluyendo el evento actual)
        const dateIsTaken = existingEvents.some(ev => {
            if (ev._id === eventId) return false;
            if (!ev.initDate) return false;
            const evDateStr = new Date(ev.initDate).toISOString().split('T')[0];
            return evDateStr === form.initDate && ev.status !== 'Cancelado';
        });

        if (dateIsTaken) {
            setErrorMsg(`Ya tienes otro evento registrado para el día ${form.initDate}. Por favor selecciona otra fecha.`);
            return;
        }

        try {
            await updateEvent({ id: eventId, payload: form });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-[#3e1916]/10 p-6 md:p-8 rounded-3xl shadow-2xl max-w-xl w-full relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 p-2 rounded-full hover:bg-[#3e1916]/5 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5 text-[#3e1916]" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#35ab9f]/15 p-3 rounded-2xl text-[#35ab9f]">
                        <Edit className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bricolage font-extrabold text-xl md:text-2xl text-[#3e1916]">
                            Editar Evento
                        </h3>
                        <p className="text-xs text-[#3e1916]/60">Modifica los campos que desees actualizar</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-12 text-center text-sm text-[#3e1916]/60">Cargando datos del evento...</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMsg && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">Nombre del evento</label>
                            <div className="relative">
                                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#35ab9f]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">Hora de inicio</label>
                                <div className="relative">
                                    <Clock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                                    <input
                                        type="time"
                                        name="eventTime"
                                        value={form.eventTime}
                                        onChange={handleChange}
                                        className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#35ab9f]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">Fecha del evento</label>
                                <div className="relative">
                                    <Calendar className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                                    <input
                                        type="date"
                                        name="initDate"
                                        min={getTodayString()}
                                        value={form.initDate}
                                        onChange={handleChange}
                                        className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#35ab9f]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">Ubicación</label>
                                <div className="relative">
                                    <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#35ab9f]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">Tipo de Evento</label>
                                <div className="relative">
                                    <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3e1916]/40 pointer-events-none" />
                                    <select
                                        name="eventType"
                                        value={form.eventType}
                                        onChange={handleChange}
                                        className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#35ab9f] appearance-none cursor-pointer"
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

                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-[#3e1916]/80 block">Descripción</label>
                            <div className="relative">
                                <FileText className="w-5 h-5 absolute left-3.5 top-3.5 text-[#3e1916]/40" />
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full bg-[#fffcf9] border border-[#3e1916]/15 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#35ab9f] resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-[#3e1916]/15 text-sm font-bold text-[#3e1916]/70 hover:bg-[#3e1916]/5 transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-5 py-2.5 rounded-xl bg-[#35ab9f] hover:bg-[#2d9287] text-white text-sm font-bold shadow-md shadow-[#35ab9f]/20 transition-all cursor-pointer"
                            >
                                {isPending ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};