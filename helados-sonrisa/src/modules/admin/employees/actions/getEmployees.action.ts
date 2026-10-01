import { HeladosSonrisa_API } from "../../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../interfaces/admin-api-response.interface";
import type { Employee } from "../interfaces/employee.interface";

export const getEmployeesAction = async (): Promise<AdminApiResponse<Employee[]>> => {
    const { data } = await HeladosSonrisa_API.get<AdminApiResponse<Employee[]>>("/employees");
    return data;
};