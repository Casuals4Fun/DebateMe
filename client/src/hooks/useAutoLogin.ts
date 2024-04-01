import { User, AuthStatus } from '../store/useAuthStore';

type SetRoute = (navigate: string) => void;
type SetUser = (user: User) => void;
type SetIsAuthenticated = (authenticated: AuthStatus) => void;

const useAutoLogin = (setRoute: SetRoute, setUser: SetUser, setIsAuthenticated: SetIsAuthenticated) => {
    const token = localStorage.getItem('token');

    if (!token) {
        if (location.pathname !== '/auth') setRoute(location.pathname);
        return setIsAuthenticated(AuthStatus.Failed);
    }
    else {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        fetch(`${import.meta.env.VITE_API_URL}/auth/auto-login`, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then(response => {
                setUser(response.data.user);
                setIsAuthenticated(AuthStatus.Authenticated);
            })
            .catch(() => setIsAuthenticated(AuthStatus.Failed));
    }
};

export default useAutoLogin;