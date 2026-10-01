import { HeladosSonrisa_API } from "../../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../interfaces/admin-api-response.interface";

export const toggleCustomerStatusAction = async (id: string): Promise<AdminApiResponse<{ id: string; isActive: boolean }>> => {
    const { data } = await HeladosSonrisa_API.patch<AdminApiResponse<{ id: string; isActive: boolean }>>(`/customers/change-status/${id}`);
    return data;
};