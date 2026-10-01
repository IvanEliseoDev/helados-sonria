import { HeladosSonrisa_API } from "../../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../interfaces/admin-api-response.interface";

export const deleteEmployeeAction = async (id: string): Promise<AdminApiResponse<{ id: string; email: string }>> => {
    const { data } = await HeladosSonrisa_API.delete<AdminApiResponse<{ id: string; email: string }>>(`/employees/${id}`);
    return data;
};