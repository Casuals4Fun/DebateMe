import { useEffect } from "react";
import { AuthStatus, AuthTab, useAuthStore, useTempStore } from "../../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, setAuthTab } = useAuthStore();
    const { setTempUser } = useTempStore();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const type = params.get('type');
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
            navigate('/auth', { replace: true });
        }

        if (isAuthenticated === AuthStatus.Authenticated) {
            navigate('/', { replace: true });
        } else if (location.pathname === '/auth') {
            setAuthTab(type === 'signup' ? AuthTab.Signup : AuthTab.Login);
        } else {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, location.pathname, location.search, navigate, setAuthTab, setTempUser]);

    return <div />;
}