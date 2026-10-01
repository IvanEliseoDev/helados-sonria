import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API";
import type { Event } from "../interfaces/event.interface";

export const getAllEventsAction = async (): Promise<Event> => {
    const { data } = await HeladosSonrisa_API.get<Event>("/events");
    return data;
};