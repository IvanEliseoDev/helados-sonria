import { useMutation, useQueryClient } from "@tanstack/react-query"
import { newEventAction } from "../actions/newEvent.action"
import type { EventReq } from "../interfaces/event.create.request"
import { toast } from "sonner"
import { cancelMyEventAction } from "../actions/cancelMyEvent.action"
import { updateMyEventAction } from "../actions/updateMyEvent.action"
import type { UpdateMyEventReq } from '../interfaces/event.update.request';

export const useCreateEvent = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (payload: EventReq) => newEventAction(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            toast.success("Evento reservado exitosamente, en unos momentos tendrás una respuesta")
        },
        onError: () => {
            toast.error("Error al reservar el evento, vuelve a intentarlo")
        }
    })
}

export const useCancelMyEvent = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: (id: string) => cancelMyEventAction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            toast.success("Evento cancelado exitosamente")
        },
        onError: () => {
            toast.error("Error al cancelar el evento, vuelve a intentarlo")
        }
    })
}

export const useUpdateMyEvent = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        // 1. Recibimos un objeto que contenga el id y el payload
        mutationFn: ({ id, payload }: { id: string; payload: UpdateMyEventReq }) => 
            updateMyEventAction(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            // 2. Corregido el mensaje del toast para actualización
            toast.success("Evento actualizado exitosamente")
        },
        onError: () => {
            // 3. Corregido el mensaje de error del toast
            toast.error("Error al actualizar el evento, vuelve a intentarlo")
        }
    })
}