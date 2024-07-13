import { create } from "zustand"

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

interface NavStore {
    theme: Theme;
    setTheme: (theme_data: Theme) => void;
    expand: boolean;
    setExpand: (toggle: boolean) => void;
    sidebar: boolean;
    setSidebar: (toggle: boolean) => void;
}

export const useNavStore = create<NavStore>((set) => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || Theme.Dark;
    const savedSidebar = localStorage.getItem('sidebar') === 'true' || false;

    return {
        theme: savedTheme,
        setTheme: (theme_data: Theme) => {
            set({ theme: theme_data });
            localStorage.setItem('theme', theme_data);
        },
        expand: false,
        setExpand: (toggle: boolean) => set({ expand: toggle }),
        sidebar: savedSidebar,
        setSidebar: (toggle: boolean) => {
            set({ sidebar: toggle });
            localStorage.setItem('sidebar', toggle.toString());
        }
    };
});