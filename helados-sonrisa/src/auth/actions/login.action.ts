import { HeladosSonrisa_API } from "../../api/HeladosSonrisa_API"
import type { LoginResponse } from "./responses/login.interface.response"

export const loginAction = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const { data } = await HeladosSonrisa_API.post<LoginResponse>('/auth/login', {
            email: email,
            password: password
        })
        if (data.statusCode != 200 || !data.data) {
            throw new Error(`Error en la accion de iniciar sesion ${data.message}`)
        }
        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}