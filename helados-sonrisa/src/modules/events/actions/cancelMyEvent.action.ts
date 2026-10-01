import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API";

import type { CancelMyEventResponse } from "../interfaces/responses/cancel.myevent.response";

export const cancelMyEventAction = async(id:string):Promise<CancelMyEventResponse> => {
    try {
        const {data} = await HeladosSonrisa_API.delete<CancelMyEventResponse>(`/events/me/${id}`)
        if(data.statusCode !== 200 ){
            throw new Error("Error al crear al cancelar")
        }
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el nuevo evento", { cause: error })
    }
}