import { HeladosSonrisa_API } from "../../api/HeladosSonrisa_API";
import type { MeResponse } from "./responses/me.interface.response";

export const meAction = async():Promise<MeResponse> => {
    try {
        const {data} = await HeladosSonrisa_API.get<MeResponse>("/auth/me")
        if(!data.data || data.statusCode != 200){
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}