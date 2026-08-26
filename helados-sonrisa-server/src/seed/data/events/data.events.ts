import { CreateEventDto } from "src/events/dto/create-event.dto";
import { Event } from "src/events/entities/event.entity";
import { EventType } from "src/events/enums/event-type.enum";

export const EVENT_DATA: (CreateEventDto & {_id: string})[] = [
  {
    _id: '65f1a2b3c4d5e6f7a8b90101' as any,
    name: 'Boda Sofía & Mateo',
    description: 'Estación de gelato en vivo con maridaje de frutos rojos para la recepción.',
    initDate: '2026-02-11',
    location: 'San Salvador',
    eventType: EventType.BODA,
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b90102' as any,
    name: 'Aniversario Tech Hub',
    description: 'Carrito retro personalizado con toppings artesanales para todo el equipo.',
    initDate: '2026-01-15',
    location: 'Santa Tecla',
    eventType: EventType.EVENTO_EMPRESARIAL,
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b90103' as any,
    name: 'Fiesta Infantil Marina',
    description: 'Paletas de sabores pastel diseñadas para temática marina.',
    initDate: '2025-12-20',
    location: 'Antiguo Cuscatlán',
    eventType: EventType.CUMPLEANOS,
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b90104' as any,
    name: 'Gala Anual de Marcas',
    description: 'Cata guiada de sorbetes artesanales con ingredientes locales.',
    initDate: '2025-11-10',
    location: 'San Salvador',
    eventType: EventType.EVENTO_EMPRESARIAL,
  },
];