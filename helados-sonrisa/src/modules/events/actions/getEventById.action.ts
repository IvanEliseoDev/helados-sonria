import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API"
import type { EventFindByIDResponse } from "../interfaces/responses/event.byid.response"

export const getEventById = async(id:string):Promise<EventFindByIDResponse> => {
    try {
        const {data} = await HeladosSonrisa_API.get<EventFindByIDResponse>(`/events/${id}`)
        return data
    } catch (error) {
        console.log(error)
        throw new Error("error al obtener mi evento", { cause: error })
    }
}