import { useQuery } from '@tanstack/react-query'
import { getMyEvents } from '../actions/getMyEvents.action'

export const useGetEventsMe = () => {
    return useQuery({
        queryKey: ['events', 'me'],
        queryFn: getMyEvents,
        staleTime: 1000 * 60 * 5
    })
}
