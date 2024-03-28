import "./style.css";
import React, { useEffect } from "react";
import { useToastStore } from "../../store/useToastStore";

const Toast: React.FC = () => {
    const { toasts, removeToast } = useToastStore();

    useEffect(() => {
        const timers = toasts.map(toast => {
            const timer = setTimeout(() => {
                removeToast(toast.id);
            }, 3000);
            return timer;
        });

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [toasts, removeToast]);

    return (
        toasts.map((toast) => (
            <div className={`toast-container ${toast.position}`} key={toast.id}>
                <div className={`toast toast-${toast.type}`}>
                    {toast.message}
                </div>
            </div>
        ))
    );
};

export default React.memo(Toast);