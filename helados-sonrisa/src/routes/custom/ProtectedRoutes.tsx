import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../../auth/store/auth.store";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const authStatus = useAuthStore((state) => state.authStatus);

    if (authStatus === "checking") {
        return <div>Verificando sesión...</div>;
    }
    if (authStatus === "not-authenticated") {
        return <Navigate to="/auth/login" replace />;
    }
    return <>{children}</>;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const authStatus = useAuthStore((state) => state.authStatus);
    if (authStatus === "checking") {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Verificando sesión...</p>
            </div>
        );
    }
    if (authStatus === "authenticated") {
        return <Navigate to="/" replace />
    }
    return <>{children}</>
}
