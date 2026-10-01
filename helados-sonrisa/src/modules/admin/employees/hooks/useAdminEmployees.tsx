import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEmployeeAction } from "../actions/createEmployee.action";
import { deleteEmployeeAction } from "../actions/deleteEmployee.action";
import { getEmployeeByIdAction } from "../actions/getEmployeeById.action";
import { getEmployeesAction } from "../actions/getEmployees.action";
import { toggleEmployeeStatusAction } from "../actions/toggleEmployeeStatus.action";
import { updateEmployeeAction } from "../actions/updateEmployee.action";

export const useGetEmployees = () => useQuery({
    queryKey: ["admin", "employees"],
    queryFn: getEmployeesAction,
});

export const useGetEmployeeById = (id: string | null) => useQuery({
    queryKey: ["admin", "employees", id],
    queryFn: () => getEmployeeByIdAction(id!),
    enabled: Boolean(id),
});

const useRefreshEmployees = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["admin", "employees"] });
};

export const useCreateEmployee = () => {
    const refreshEmployees = useRefreshEmployees();
    return useMutation({
        mutationFn: createEmployeeAction,
        onSuccess: async (response) => {
            await refreshEmployees();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo registrar el empleado"),
    });
};

export const useUpdateEmployee = () => {
    const refreshEmployees = useRefreshEmployees();
    return useMutation({
        mutationFn: updateEmployeeAction,
        onSuccess: async (response) => {
            await refreshEmployees();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo actualizar el empleado"),
    });
};

export const useToggleEmployeeStatus = () => {
    const refreshEmployees = useRefreshEmployees();
    return useMutation({
        mutationFn: toggleEmployeeStatusAction,
        onSuccess: async (response) => {
            await refreshEmployees();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo actualizar el estado del empleado"),
    });
};

export const useDeleteEmployee = () => {
    const refreshEmployees = useRefreshEmployees();
    return useMutation({
        mutationFn: deleteEmployeeAction,
        onSuccess: async (response) => {
            await refreshEmployees();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo eliminar el empleado"),
    });
};