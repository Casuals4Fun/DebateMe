import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthStatus, AuthTab, useAuthStore } from "./store/useAuthStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, setAuthTab } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated === AuthStatus.Failed) {
            setAuthTab(AuthTab.Login);
        }
    }, [isAuthenticated, setAuthTab]);

    if (isAuthenticated === AuthStatus.Authenticating) {
        return <>Loading</>
    }
    else if (isAuthenticated === AuthStatus.Failed) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};