import { useEffect } from "react";
import { AuthStatus, AuthTab, useAuthStore } from "../../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, setAuthTab } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated !== AuthStatus.Authenticating) {
            if (isAuthenticated !== AuthStatus.Authenticated) {
                if (location.pathname === '/auth') {
                    setAuthTab(AuthTab.Login);
                }
                else navigate('/');
            }
            else navigate('/');
        }
    }, [isAuthenticated, location.pathname, navigate, setAuthTab]);

    return <div />
}