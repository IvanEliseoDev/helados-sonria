import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCustomerAction } from "../actions/deleteCustomer.action";
import { getCustomerByIdAction } from "../actions/getCustomerById.action";
import { getCustomersAction } from "../actions/getCustomers.action";
import { toggleCustomerStatusAction } from "../actions/toggleCustomerStatus.action";

export const useGetCustomers = () => useQuery({
    queryKey: ["admin", "customers"],
    queryFn: getCustomersAction,
});

export const useGetCustomerById = (id: string | null) => useQuery({
    queryKey: ["admin", "customers", id],
    queryFn: () => getCustomerByIdAction(id!),
    enabled: Boolean(id),
});

export const useToggleCustomerStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleCustomerStatusAction,
        onSuccess: (response) => {
            void queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo actualizar el estado del cliente"),
    });
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCustomerAction,
        onSuccess: (response) => {
            void queryClient.invalidateQueries({ queryKey: ["admin", "customers"] });
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo eliminar el cliente"),
    });
};