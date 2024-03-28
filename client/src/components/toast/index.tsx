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
        toasts.map((toast, index) => {
            const marginStyle = toast.position.startsWith('bottom') ? { marginBottom: `${index * 10}px` } : { marginTop: `${index * 10}px` };

            return (
                <div
                    key={toast.id}
                    className={`toast-container ${toast.position}`}
                    style={{
                        zIndex: 9999 - index,
                        ...marginStyle
                    }}
                >
                    <div
                        className='toast'
                        style={{
                            backgroundColor: `var(--toast-${toast.type}-bg)`,
                            opacity: 1 - (0.2 * index),
                            width: `calc(300px - ${5 * index}px)`
                        }}
                    >
                        {toast.message}
                    </div>
                </div>
            );
        })
    );
};

export default React.memo(Toast);