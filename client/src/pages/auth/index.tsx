import { useEffect } from "react";
import { AuthStatus, AuthTab, useAuthStore, useTempStore } from "../../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { route, isAuthenticated, setAuthTab } = useAuthStore();
    const { setTempUser } = useTempStore();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const type = params.get('type');

        if (isAuthenticated === AuthStatus.Authenticating) {
            setAuthTab(type === 'login' ? AuthTab.Login : type === 'signup' ? AuthTab.Signup : AuthTab.Login);
        }
        else if (isAuthenticated === AuthStatus.Authenticated) {
            navigate(route === '/auth' || route === '/login' || route === '/signup' ? '/' : route, { replace: true });
        }
        else if (isAuthenticated === AuthStatus.Failed) {
            setAuthTab(type === 'login' ? AuthTab.Login : type === 'signup' ? AuthTab.Signup : AuthTab.Login);
        }

        const userData = params.get('user');
        const token = params.get('token');
        const user = userData ? JSON.parse(decodeURIComponent(userData)) : null;

        if (type === 'login' && token) localStorage.setItem('token', token);
        else if (type === 'signup' && user) {
            setTempUser({
                username: "",
                email: user.email || "",
                first_name: user.given_name || "",
                last_name: user.family_name || "",
                avatar: user.picture || ""
            });
            setAuthTab(AuthTab.Signup);
            navigate('/auth?type=signup', { replace: true });
        }
    }, [isAuthenticated, location.search, navigate, route, setAuthTab, setTempUser]);

    return <div />
}