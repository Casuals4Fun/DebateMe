import { create } from 'zustand'

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

interface NavStore {
    theme: Theme
    setTheme: (theme: Theme) => void
    isNavbarOpen: boolean
    setNavbarOpen: (toggle: boolean) => void
    isSidebarClose: boolean
    setSidebarClose: (toggle: boolean) => void
}

export const useNavStore = create<NavStore>((set) => ({
    theme: (() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) return savedTheme as Theme

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? Theme.Dark : Theme.Light
    })(),
    setTheme: (theme: Theme) => {
        localStorage.setItem('theme', theme)
        document.body.setAttribute('data-theme', theme)
        set({ theme })
    },

    isNavbarOpen: false,
    setNavbarOpen: (toggle: boolean) => set(() => ({ isNavbarOpen: toggle })),

    isSidebarClose: (() => {
        const savedSidebar = localStorage.getItem('sidebar')
        return savedSidebar === 'true'
    })(),
    setSidebarClose: (toggle: boolean) => {
        set(() => ({ isSidebarClose: toggle }))
        localStorage.setItem('sidebar', toggle.toString())
    }
}))