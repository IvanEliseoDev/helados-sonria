import { RouterProvider } from "react-router"
import { appRouter } from "./routes/AppRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import { useCheckAuth } from "./auth/hooks/useCheckAuth"

const queryClient = new QueryClient()

export const HSonrisasApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      <Toaster richColors position="top-right" />
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  )
}

const AuthBootstrap = () => {
  useCheckAuth()
  return null
}
