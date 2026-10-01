import { HeladosSonrisa_API } from "../../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../interfaces/admin-api-response.interface";
import type { Employee } from "../interfaces/employee.interface";

export interface EmployeePayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const createEmployeeAction = async (payload: EmployeePayload): Promise<AdminApiResponse<Employee>> => {
    const { data } = await HeladosSonrisa_API.post<AdminApiResponse<Employee>>("/employees", payload);
    return data;
};