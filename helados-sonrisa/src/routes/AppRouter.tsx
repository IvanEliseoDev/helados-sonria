import { createBrowserRouter } from "react-router";
import { HeladosSonrisaLanding } from "../modules/home/pages/HomePage";
import { ProductsPage } from "../modules/products/pages/ProductsPage";
import { EventsPage } from "../modules/events/pages/EventsPage";
import { PublicEventsPage } from "../modules/events/pages/PublicEventsPage";
import { ProductDetail } from "../modules/products/pages/ProductDetail";
import { Authlayout } from "../modules/auth/layout/Authlayout";
import { LoginPage } from "../modules/auth/pages/LoginPage"
import { RegisterPage } from "../modules/auth/pages/RegisterPage";
import { NotAuthenticatedRoute } from "./custom/ProtectedRoutes";
import { ViewEventDetailPage } from "../modules/events/pages/ViewEventDetailPage";
import { DashboardPage } from "../modules/admin/dashboard/pages/DashboardPage";
import { AdminLayout } from "../modules/admin/layouts/AdminLayout";
import { EmployeesPage } from "../modules/admin/employees/pages/EmployeesPage";
import { CustomersPage } from "../modules/admin/customers/pages/CustomersPage";
import { AdminEventsPage } from "../modules/admin/events/pages/EventPages";

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
        element:  <EventsPage /> 
    },
    {
        path: "/eventos/agendar/ver/:id",
        element:  <ViewEventDetailPage /> 
    },
    {
        path: "/auth",
        element: <Authlayout />,
        children: [
            {
                path: "login",
                element:<NotAuthenticatedRoute> <LoginPage /> </NotAuthenticatedRoute> 
            },
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "inicio",
                element:<DashboardPage />
            },
            {
                path: "empleados",
                element: <EmployeesPage />
            },
            {
                path: "clientes",
                element: <CustomersPage />
            },
            {
                path: "eventos",
                element: <AdminEventsPage />
            }
        ]
    }
])
