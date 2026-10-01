import { useMutation } from '@tanstack/react-query';
import { registerCustomerAction } from '../actions/register.customer.action';
import type { RegisterCustomerReq } from '../interfaces/request/register.customer.request';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const useRegisterMutate = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (payload: RegisterCustomerReq) => registerCustomerAction(payload),
        onSuccess: () => {
            toast.success("Usuario Registrado exitosamente, bienvenido")
            navigate("../login")
        },
        onError: () => {
            toast.error("Error al registrar tus datos, intentalo de nuevo")
        }
    })
}
