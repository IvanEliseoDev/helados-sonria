import { useQuery } from '@tanstack/react-query';
import { meAction } from '../actions/me.action';
import { useAuthStore } from '../store/auth.store';
import { useEffect } from 'react';

//? Hook encargado de verificar la sesión activa del usuario consumiendo la API
export const useCheckAuth = () => {
    //* Selectores de Zustand para actualizar la sesión en la store global
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);

    //* Petición asíncrona mediante React Query para validar las cookies en el backend (/auth/me)
    const query = useQuery({
        queryKey: ['auth-user'],
        queryFn: meAction,
        retry: false, //! Desactiva reintentos si la cookie expira o da 401
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, //* Mantiene el estado fresco durante 5 minutos para evitar peticiones repetidas
    });

    //? Sincroniza el resultado de React Query con la store de Zustand de manera reactiva
    useEffect(() => {
        //* Si el backend devuelve data válida, guarda la entidad y el rol en el estado global
        if (query.data?.data) {
            const { user, role } = query.data.data;
            setAuth(user, role);
        } 
        //! Si la petición falla (401 o sin token), limpia la store global y marca como no autenticado
        else if (query.isError) {
            clearAuth();
        }
    }, [query.data, query.isError, setAuth, clearAuth]);

    return query;
};