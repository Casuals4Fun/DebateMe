import { NavigateFunction } from 'react-router-dom';
import { AuthStatus, User } from '../store/useAuthStore';
import { toast } from 'sonner';

type SetIsAuthenticated = (authenticated: AuthStatus) => void
type SetUser = (data: User) => void

const useLogout = (navigate: NavigateFunction, setIsAuthenticated: SetIsAuthenticated, setUser: SetUser) => {
    navigate('/');
    setIsAuthenticated(AuthStatus.Failed);
    setUser({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
    })
    localStorage.removeItem('token');
    toast.success('Logout successfull');
};

export default useLogout;