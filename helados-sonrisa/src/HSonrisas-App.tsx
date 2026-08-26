import { RouterProvider } from "react-router"
import { appRouter } from "./routes/AppRouter"

export const HSonrisasApp = () => {
  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}
