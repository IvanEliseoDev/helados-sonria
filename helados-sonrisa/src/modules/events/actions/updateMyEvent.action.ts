import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API";
import type { UpdateMyEventReq } from "../interfaces/event.update.request";
import type { UpdateMyEventResponse } from "../interfaces/responses/update.myevent.response";


export const updateMyEventAction = async(id:string, payload:UpdateMyEventReq):Promise<UpdateMyEventResponse> => {
    try {
        const {data} = await HeladosSonrisa_API.put<UpdateMyEventResponse>(`/events/me/${id}`, payload)
        if(data.statusCode !== 200 ){
            throw new Error("Error al actualizar el evento")
        }
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el nuevo evento", { cause: error })
    }
}