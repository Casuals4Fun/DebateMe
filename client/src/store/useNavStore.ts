import { create } from 'zustand'

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

interface NavStore {
    theme: Theme
    setTheme: (theme_data: Theme) => void
    isNavbarOpen: boolean
    setNavbarOpen: (toggle: boolean) => void
    isSidebarClose: boolean
    setSidebarClose: (toggle: boolean) => void
}

export const useNavStore = create<NavStore>((set) => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || Theme.Dark
    const savedSidebar = localStorage.getItem('sidebar') === 'true' || false

    return {
        theme: savedTheme,
        setTheme: (theme_data: Theme) => {
            set({ theme: theme_data })
            localStorage.setItem('theme', theme_data)
        },
        isNavbarOpen: false,
        setNavbarOpen: (toggle: boolean) => set({ isNavbarOpen: toggle }),
        isSidebarClose: savedSidebar,
        setSidebarClose: (toggle: boolean) => {
            set({ isSidebarClose: toggle })
            localStorage.setItem('sidebar', toggle.toString())
        }
    }
})