import { Navigate } from "react-router-dom";
import { AuthStatus, useAuthStore } from "./store/useAuthStore";
import { LoadingComponent } from "./components/loading/svg";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated === AuthStatus.Authenticating) {
        return <LoadingComponent />
    }
    else if (isAuthenticated === AuthStatus.Failed) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};