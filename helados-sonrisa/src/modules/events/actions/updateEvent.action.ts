import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../admin/interfaces/admin-api-response.interface";
import type { Datum, eventStatus } from "../interfaces/event.interface";

export type UpdateEventPayload = {
    name?: string;
    description?: string;
    eventTime?: string;
    initDate?: string;
    location?: string;
    eventType?: string;
    status?: eventStatus;
};

export const updateEventAction = async ({ id, payload }: { id: string; payload: UpdateEventPayload }): Promise<AdminApiResponse<Datum>> => {
    const { data } = await HeladosSonrisa_API.patch<AdminApiResponse<Datum>>(`/events/${id}`, payload);
    return data;
};