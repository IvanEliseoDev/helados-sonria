import { useQuery } from '@tanstack/react-query'
import { getEventById } from '../actions/getEventById.action'

export const useGetEventById = (id:string) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => getEventById(id),
    staleTime: 1000 * 60 * 5
  })
}
