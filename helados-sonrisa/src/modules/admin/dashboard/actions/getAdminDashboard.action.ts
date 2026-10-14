import { HeladosSonrisa_API } from "../../../../api/HeladosSonrisa_API"
import type { AdminDashboardResponse } from "../interface/responses/get-admindashboard.response"

export const getAdminDashboardAction = async():Promise<AdminDashboardResponse> => {
    try {
        const {data} = await HeladosSonrisa_API.get<AdminDashboardResponse>("/admin-dashboard")
        if(data.statusCode !== 200) {
            throw new Error("error en la accion de admin dashboard")
        }
        return data
    } catch (error) {
        console.log({error})
        // Añadimos { cause: error } para cumplir con la regla del linter
        throw new Error("error en la accion de admin dashboard", { cause: error })
    }
}