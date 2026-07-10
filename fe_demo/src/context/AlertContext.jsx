import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([]);

    const showAlert = useCallback((message, variant = 'success') => {
        const id = Date.now() + Math.random().toString(36).substring(2, 9);
        setAlerts((prev) => [...prev, { id, message, variant, isClosing: false }]);

        // Tự động đóng sau 3 giây (3000ms) - Bắt đầu quá trình đóng để chạy animation
        setTimeout(() => {
            closeAlert(id);
        }, 3000);
    }, []);

    const closeAlert = useCallback((id) => {
        // Đánh dấu alert đang đóng để chạy hiệu ứng mờ dần
        setAlerts((prev) => 
            prev.map(alert => alert.id === id ? { ...alert, isClosing: true } : alert)
        );

        // Sau 300ms (bằng thời gian transition), xóa hẳn khỏi DOM
        setTimeout(() => {
            setAlerts((prev) => prev.filter((a) => a.id !== id));
        }, 300);
    }, []);

    const alertControls = {
        success: useCallback((msg) => showAlert(msg, 'success'), [showAlert]),
        error: useCallback((msg) => showAlert(msg, 'danger'), [showAlert]),
        info: useCallback((msg) => showAlert(msg, 'info'), [showAlert]),
        show: showAlert
    };

    return (
        <AlertContext.Provider value={alertControls}>
            {children}
            
            {/* Vùng chứa Alert - Cố định ở góc trên bên phải */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                pointerEvents: 'none' // Để không block click ở các vùng trống
            }}>
                {alerts.map((a) => (
                    <div 
                        key={a.id} 
                        style={{ pointerEvents: 'auto' }} // Khôi phục lại khả năng click cho bản thân alert
                    >
                        <Alert 
                            variant={a.variant} 
                            onClose={() => closeAlert(a.id)} 
                            dismissible
                            className="shadow"
                            style={{
                                margin: 0,
                                minWidth: '300px',
                                transition: 'all 0.3s ease-in-out',
                                opacity: a.isClosing ? 0 : 1,
                                transform: a.isClosing ? 'translateX(100%)' : 'translateX(0)',
                                animation: 'slideIn 0.3s ease-out forwards'
                            }}
                        >
                            <strong>
                                {a.variant === 'success' ? '✅ Thành công' : a.variant === 'danger' ? '❌ Thất bại' : 'ℹ️ Thông báo'}
                            </strong>
                            <div className="mt-1">{a.message}</div>
                        </Alert>
                    </div>
                ))}
            </div>

            {/* Chèn style inline cho animation slideIn */}
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(100%); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
}
