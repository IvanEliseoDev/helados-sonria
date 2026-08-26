import { createBrowserRouter } from "react-router";
import { HeladosSonrisaLanding } from "../modules/home/pages/HomePage";
import { ProductsPage } from "../modules/products/pages/ProductsPage";
import { EventsPage } from "../modules/events/pages/EventsPage";
import { PublicEventsPage } from "../modules/events/pages/PublicEventsPage";
import { ProductDetail } from "../modules/products/pages/ProductDetail";


export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <HeladosSonrisaLanding />
    },
    {
        path: "/products",
        element: <ProductsPage />
    },
    {
        path: "/products/detail/:id",
        element: <ProductDetail />
    },
    {
        path: "/eventos",
        element: <PublicEventsPage />
    },
    {
        path: "/eventos/agendar",
        element: <EventsPage />
    }
])
