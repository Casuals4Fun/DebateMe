import { User, AuthStatus } from '../store/useAuthStore';

type SetUser = (user: User) => void;
type SetIsAuthenticated = (authenticated: AuthStatus) => void;

const useAutoLogin = (setUser: SetUser, setIsAuthenticated: SetIsAuthenticated) => {
    const token = localStorage.getItem('token');

    if (token) {
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
            .catch(error => {
                console.error('Auto-login failed:', error);
                setIsAuthenticated(AuthStatus.Failed);
            });
    }
    else setIsAuthenticated(AuthStatus.Failed);
};

export default useAutoLogin;