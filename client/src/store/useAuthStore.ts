import { create } from "zustand";

export enum AuthTab {
    Closed = 'closed',
    Login = 'login',
    Signup = 'signup',
    Info = 'info'
}

interface AuthStore {
    authTab: AuthTab;
    setAuthTab: (tab: AuthTab) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (authenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    authTab: AuthTab.Info,
    setAuthTab: (tab: AuthTab) => set({ authTab: tab }),
    isAuthenticated: false,
    setIsAuthenticated: (authenticated: boolean) => set({ isAuthenticated: authenticated })
}));