import { useQuery } from '@tanstack/react-query'
import { getAdminDashboardAction } from '../actions/getAdminDashboard.action'

export const useGetAdminDashboard = () => {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: getAdminDashboardAction,
    staleTime: 1000 * 60 * 10
  })
}
