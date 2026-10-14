import { type PropsWithChildren } from 'react'
import { useAuthStore } from '../../auth/store/auth.store'
import { Navigate } from 'react-router'

export const EmployeeProtectedRoutes = ({children}:PropsWithChildren) => {
  const authRole = useAuthStore((auth) => auth.role)
  if(authRole !== "EMPLEADO"){
        return <Navigate to={"/"} />
  }
  return children
}
