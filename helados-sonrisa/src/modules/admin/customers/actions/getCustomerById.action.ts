import { HeladosSonrisa_API } from "../../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../interfaces/admin-api-response.interface";
import type { Customer } from "../interfaces/customer.interface";

export const getCustomerByIdAction = async (id: string): Promise<AdminApiResponse<Customer>> => {
    const { data } = await HeladosSonrisa_API.get<AdminApiResponse<Customer>>(`/customers/${id}`);
    return data;
};