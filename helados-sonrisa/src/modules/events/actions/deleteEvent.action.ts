import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../admin/interfaces/admin-api-response.interface";

export const deleteEventAction = async (id: string): Promise<AdminApiResponse<null>> => {
    const { data } = await HeladosSonrisa_API.delete<AdminApiResponse<null>>(`/events/${id}`);
    return data;
};