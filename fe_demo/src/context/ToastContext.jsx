import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, variant = 'success') => {
        const id = Date.now() + Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, variant }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = {
        success: useCallback((msg) => showToast(msg, 'success'), [showToast]),
        error: useCallback((msg) => showToast(msg, 'danger'), [showToast]),
        info: useCallback((msg) => showToast(msg, 'info'), [showToast]),
        show: showToast
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999, position: 'fixed' }}>
                {toasts.map((t) => (
                    <Toast 
                        key={t.id} 
                        onClose={() => removeToast(t.id)} 
                        delay={3000} 
                        autohide
                        bg={t.variant}
                        className="text-white mb-2 shadow"
                    >
                        <Toast.Header closeButton>
                            <strong className="me-auto">
                                {t.variant === 'success' ? '✅ Thành công' : t.variant === 'danger' ? '❌ Thất bại' : 'ℹ️ Thông báo'}
                            </strong>
                        </Toast.Header>
                        <Toast.Body className="fw-bold">{t.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
