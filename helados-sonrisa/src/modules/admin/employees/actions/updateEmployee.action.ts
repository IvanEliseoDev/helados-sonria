import { HeladosSonrisa_API } from "../../../../api/HeladosSonrisa_API";
import type { AdminApiResponse } from "../../interfaces/admin-api-response.interface";
import type { Employee } from "../interfaces/employee.interface";
import type { EmployeePayload } from "./createEmployee.action";

export type UpdateEmployeePayload = Partial<EmployeePayload>;

export const updateEmployeeAction = async ({ id, payload }: { id: string; payload: UpdateEmployeePayload }): Promise<AdminApiResponse<Employee>> => {
    const { data } = await HeladosSonrisa_API.patch<AdminApiResponse<Employee>>(`/employees/${id}`, payload);
    return data;
};