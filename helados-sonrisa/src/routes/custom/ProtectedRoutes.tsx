import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../../auth/store/auth.store";
import { CheckingSessionScreen } from "../../components/global/CheckingSessionScreen";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const authStatus = useAuthStore((state) => state.authStatus);

    if (authStatus === "checking") {
        return <CheckingSessionScreen />;
    }
    if (authStatus === "not-authenticated") {
        return <Navigate to="/auth/login" replace />;
    }
    return <>{children}</>;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const authStatus = useAuthStore((state) => state.authStatus);
    if (authStatus === "checking") {
        return <CheckingSessionScreen />;
    }
    if (authStatus === "authenticated") {
        return <Navigate to="/" replace />
    }
    return <>{children}</>
}
