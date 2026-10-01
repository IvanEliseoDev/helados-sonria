import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "../actions/login.action";
import { logoutAction } from "../actions/logOut.action";
import { useAuthStore } from "../store/auth.store";
import { toast } from "sonner";

interface UserReq {
    email: string;
    password: string;
}

export const useAuth = () => {
    const queryClient = useQueryClient();

    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const setChecking = useAuthStore((state) => state.setChecking); // <--- Traemos el método checking si quieres forzarlo
    const authStatus = useAuthStore((state) => state.authStatus);
    

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: UserReq) => loginAction(email, password),
        onSuccess: (response) => {
            const { user, role } = response.data;
            setAuth(user, role);
            queryClient.invalidateQueries({ queryKey: ["auth-user"] });
            toast.success("Inicio de sesión exitoso");
        },
        onError: (error) => {
            console.error("Error en login:", error);
            toast.error("Credenciales incorrectas");
        }
    });

    const logoutMutation = useMutation({
        mutationFn: logoutAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["events", "me"]})
            clearAuth();
            toast.success("Sesión cerrada exitosamente");
        },
        onError: () => {
            clearAuth();
        }
    });

    return {
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        logout: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isPending,

        // Estados y métodos de verificación
        isChecking: authStatus === "checking",
        authStatus,
        setChecking,
        refetchCheckAuth: () => queryClient.invalidateQueries({ queryKey: ["auth-user"] }),
    };
};