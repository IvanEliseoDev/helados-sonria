import { CreateEventDto } from "src/events/dto/create-event.dto";
import { EventType } from "src/events/enums/event-type.enum";

export const EVENT_DATA: (CreateEventDto & { _id: string })[] = [
  {
    _id: '65f1a2b3c4d5e6f7a8b90101' as any,
    name: 'Boda Sofía & Mateo',
    description: 'Estación de gelato en vivo con maridaje de frutos rojos para la recepción.',
    eventTime: "16:01",
    initDate: '2026-02-11',
    location: 'San Salvador',
    eventType: EventType.BODA,
    user: '65f1a2b3c4d5e6f7a8b91111', // ID del cliente asignado (ej: Carlos)
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b90102' as any,
    name: 'Aniversario Tech Hub',
    description: 'Carrito retro personalizado con toppings artesanales para todo el equipo.',
    eventTime: "16:01",
    initDate: '2026-01-15',
    location: 'Santa Tecla',
    eventType: EventType.EVENTO_EMPRESARIAL,
    user: '65f1a2b3c4d5e6f7a8b92222', // ID del cliente asignado (ej: María)
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b90103' as any,
    name: 'Fiesta Infantil Marina',
    description: 'Paletas de sabores pastel diseñadas para temática marina.',
    eventTime: "16:01",
    initDate: '2025-12-20',
    location: 'Antiguo Cuscatlán',
    eventType: EventType.CUMPLEANOS,
    user: '65f1a2b3c4d5e6f7a8b91111', // Pertenece nuevamente a Carlos (un cliente puede tener varios eventos)
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b90104' as any,
    name: 'Gala Anual de Marcas',
    description: 'Cata guiada de sorbetes artesanales con ingredientes locales.',
    eventTime: "16:01",
    initDate: '2025-11-10',
    location: 'San Salvador',
    eventType: EventType.EVENTO_EMPRESARIAL,
    user: '65f1a2b3c4d5e6f7a8b93333', // ID del cliente asignado (ej: Alejandro)
  },
];