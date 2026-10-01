import { HeladosSonrisa_API } from "../../api/HeladosSonrisa_API";

export const logoutAction = async () => {
    try {
        const { data } = await HeladosSonrisa_API.post('/auth/logout');
        return data;
    } catch (error) {
        console.error("Error en logoutAction:", error);
        throw error;
    }
};