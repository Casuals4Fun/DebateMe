import { create } from "zustand";

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

interface NavStore {
    theme: Theme;
    setTheme: (theme_data: Theme) => void;
    expand: boolean;
    setExpand: (toggle: boolean) => void;
}

export const useNavStore = create<NavStore>((set) => {
    const savedTheme = localStorage.getItem('theme') || Theme.Dark;
    set({ theme: savedTheme as Theme });

    return {
        theme: savedTheme as Theme,
        setTheme: (theme_data: Theme) => {
            set({ theme: theme_data });
            localStorage.setItem('theme', theme_data);
        },
        expand: false,
        setExpand: (toggle: boolean) => set({ expand: toggle })
    };
});