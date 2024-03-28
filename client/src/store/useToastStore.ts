import { create } from "zustand";

type Toast = {
    id: string;
    type: 'success' | 'error' | 'warning' | 'loading';
    message: string;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

type ToastStore = {
    toasts: Toast[];
    addToast: (type: Toast['type'], message: string, position?: Toast['position']) => void;
    removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (type, message, position = 'bottom-right') => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, type, message, position }],
        }));
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },
}));