import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { acceptEventAction } from "../actions/acceptEvent.action";
import { deleteEventAction } from "../actions/deleteEvent.action";
import { getAllEventsAction } from "../actions/getAllEvents.action";
import { rejectEventAction } from "../actions/rejectEvent.action";
import { updateEventAction } from "../actions/updateEvent.action";

export const useGetAllEvents = () => useQuery({
    queryKey: ["events", "admin"],
    queryFn: getAllEventsAction,
});

const useRefreshEvents = () => {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: ["events"] });
};

export const useUpdateEvent = () => {
    const refreshEvents = useRefreshEvents();
    return useMutation({
        mutationFn: updateEventAction,
        onSuccess: async (response) => {
            await refreshEvents();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo actualizar el evento"),
    });
};

export const useAcceptEvent = () => {
    const refreshEvents = useRefreshEvents();
    return useMutation({
        mutationFn: acceptEventAction,
        onSuccess: async (response) => {
            await refreshEvents();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo aceptar el evento"),
    });
};

export const useRejectEvent = () => {
    const refreshEvents = useRefreshEvents();
    return useMutation({
        mutationFn: rejectEventAction,
        onSuccess: async (response) => {
            await refreshEvents();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo rechazar el evento"),
    });
};

export const useDeleteEvent = () => {
    const refreshEvents = useRefreshEvents();
    return useMutation({
        mutationFn: deleteEventAction,
        onSuccess: async (response) => {
            await refreshEvents();
            toast.success(response.message);
        },
        onError: () => toast.error("No se pudo eliminar el evento"),
    });
};