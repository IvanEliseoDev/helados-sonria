import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API";
import type { EventReq } from "../interfaces/event.create.request";
import type { EventCreateResponse } from "../interfaces/responses/events.me.create.response.interface";

export const newEventAction = async(payload:EventReq):Promise<EventCreateResponse> => {
    try {
        const {data} = await HeladosSonrisa_API.post<EventCreateResponse>("/events/me", payload)
        if(data.statusCode !== 201 ){
            throw new Error("Error al crear el evento")
        }
        return data
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el nuevo evento", { cause: error })
    }
}