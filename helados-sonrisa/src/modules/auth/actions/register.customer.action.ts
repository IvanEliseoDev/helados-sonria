import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API";
import type { RegisterCustomerReq } from "../interfaces/request/register.customer.request";
import type { RegisterCustomerResponse } from "../interfaces/response/register.customer.response";

export const registerCustomerAction = async(payload:RegisterCustomerReq):Promise<RegisterCustomerResponse> => {
    try {
        const {data} = await HeladosSonrisa_API.post<RegisterCustomerResponse>("/customers", payload)
        if(data.statusCode !== 201 ){
            throw new Error("Error al registrarte")
        }
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al registrarte", { cause: error })
    }
}