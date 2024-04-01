import { Navigate } from "react-router-dom";
import { AuthStatus, useAuthStore } from "./store/useAuthStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated === AuthStatus.Authenticating) {
        return <>Loading</>
    }
    else if (isAuthenticated === AuthStatus.Failed) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};