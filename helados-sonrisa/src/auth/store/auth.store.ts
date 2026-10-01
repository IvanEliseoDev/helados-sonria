import { create } from "zustand";
import type { User } from "../actions/responses/me.interface.response";

//? Estado de autenticación para controlar el acceso a rutas públicas/privadas
export type AuthStatus = 'not-authenticated' | 'authenticated' | 'checking';

interface AuthState {
    //* Entidad del usuario logueado en la aplicación
    user: User | null;
    //* Rol asignado al usuario actual (ej. CLIENTE o EMPLEADO)
    role: string | null;
    //* Indicador del estado actual del ciclo de sesión
    authStatus: AuthStatus;

    //? Acciones sincrónicas para modificar el estado global
    setAuth: (user: User, role: string) => void;
    clearAuth: () => void;
    setChecking: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    //* Estado inicial: vacíos y en espera de verificar la cookie HttpOnly
    user: null,
    role: null,
    authStatus: "checking",

    //? Establece los datos del usuario e indica que la sesión es válida
    setAuth: (user: User, role: string) =>
        set({
            user,
            role,
            authStatus: "authenticated",
        }),

    //! Restablece completamente el estado cuando el token expira o el usuario hace Logout
    clearAuth: () =>
        set({
            user: null,
            role: null,
            authStatus: "not-authenticated",
        }),

    //* Cambia el estado a 'checking' mientras se valida el endpoint /auth/me
    setChecking: () =>
        set({
            authStatus: "checking",
        }),
}));