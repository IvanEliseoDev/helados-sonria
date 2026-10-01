import { HeladosSonrisa_API } from "../../../api/HeladosSonrisa_API"
import type { EventsMe } from "../interfaces/responses/events.me.response.interface"

export const getMyEvents = async():Promise<EventsMe> => {
    try {
        const {data} = await HeladosSonrisa_API.get<EventsMe>("/events/me")
        return data
    } catch (error) {
        console.log(error)
        throw new Error("error al obtener mis eventos", { cause: error })
        
    }
}