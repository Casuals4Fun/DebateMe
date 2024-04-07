import { toast } from 'sonner';
import { User, AuthStatus, AuthTab } from '../store/useAuthStore';

type SetRoute = (navigate: string) => void;
type SetUser = (user: User) => void;
type SetIsAuthenticated = (authenticated: AuthStatus) => void;
type SetAuthTab = (tab: AuthTab) => void;

const handleAutoLogin = (setRoute: SetRoute, setUser: SetUser, setIsAuthenticated: SetIsAuthenticated, setAuthTab: SetAuthTab) => {
    const token = localStorage.getItem('token');
    setRoute(location.pathname);

    if (!token) {
        return setIsAuthenticated(AuthStatus.Failed);
    }
    else {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/auto-login`, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    toast.success(response.message);
                    setUser(response.data.user);
                    setIsAuthenticated(AuthStatus.Authenticated);
                    setAuthTab(AuthTab.Closed);
                }
                else {
                    toast.success('Session logged out.');
                    setIsAuthenticated(AuthStatus.Failed);
                    localStorage.removeItem('token');
                }
            })
            .catch(() => {
                toast.success('Session logged out.');
                setIsAuthenticated(AuthStatus.Failed);
                localStorage.removeItem('token');
            });
    }
};

export default handleAutoLogin;