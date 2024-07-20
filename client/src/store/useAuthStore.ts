import { create } from "zustand"

export enum AuthTab {
    Closed = 'closed',
    Login = 'login',
    Signup = 'signup',
    Forgot = 'forgot',
    Reset = 'reset'
}

export enum AuthStatus {
    Authenticating = 'authenticating',
    Authenticated = 'authenticated',
    Failed = 'failed',
}

export interface User {
    username: string
    email: string
    first_name: string
    last_name: string
    avatar: string | null
}

interface AuthStore {
    route: string
    setRoute: (navigate: string) => void
    authTab: AuthTab
    setAuthTab: (tab: AuthTab) => void
    isAuthenticated: string
    setIsAuthenticated: (authenticated: AuthStatus) => void
    user: User
    setUser: (data: User) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    route: "",
    setRoute: (navigate: string) => set({ route: navigate }),
    authTab: AuthTab.Closed,
    setAuthTab: (tab: AuthTab) => set({ authTab: tab }),
    isAuthenticated: AuthStatus.Authenticating,
    setIsAuthenticated: (authenticated: AuthStatus) => set({ isAuthenticated: authenticated }),
    user: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: null
    },
    setUser: (data: User) => set({ user: data })
}));

interface TempStore {
    tempUser: User
    setTempUser: (data: User) => void
    clearTempUser: () => void
}

export const useTempStore = create<TempStore>((set) => ({
    tempUser: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: null
    },
    setTempUser: (data: User) => set({ tempUser: data }),
    clearTempUser: () => set({
        tempUser: {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            avatar: null
        }
    })
}));