import { User, AuthStatus, AuthTab } from '../store/auth'

type Callback<T> = (arg: T) => void

const handleAutoLogin = (
    setRoute: Callback<string>,
    setUser: Callback<User>,
    setIsAuthenticated: Callback<AuthStatus>,
    setAuthTab: Callback<AuthTab>
) => {
    const token = localStorage.getItem('token')
    setRoute(location.pathname)

    if (!token) return setIsAuthenticated(AuthStatus.Failed)
    else {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${token}`)

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/auto-login`, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setUser(response.data.user)
                    setIsAuthenticated(AuthStatus.Authenticated)
                    setAuthTab(AuthTab.Closed)
                } else {
                    setIsAuthenticated(AuthStatus.Failed)
                    localStorage.removeItem('token')
                }
            })
            .catch(() => setIsAuthenticated(AuthStatus.Failed))
    }
}

export default handleAutoLogin