import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOrdersByAccount, checkoutOrder, cancelOrderAPI, acceptOrderAPI } from '../service/OrderService';
import { useAccount } from '../hooks/useAccount';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const account = useAccount();

    async function fetchOrders() {
        if (account?.id) {
            setLoading(true);
            try {
                const data = await getOrdersByAccount(account.id);
                setOrders(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        } else {
            setOrders([]);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [account?.id]);

    const handleCheckout = async () => {
        if (!account?.id) return false;
        try {
            await checkoutOrder(account.id);
            await fetchOrders(); // refresh orders after checkout
            return true;
        } catch (error) {
            console.error("Checkout failed:", error);
            throw error;
        }
    };

    const handleCancelOrder = async (orderId, reasonText = "", onSuccessCallback) => {
        try {
            await cancelOrderAPI(orderId, reasonText);
            if (onSuccessCallback) {
                onSuccessCallback();
            } else {
                await fetchOrders();
            }
        } catch (error) {
            console.error("Cancel failed:", error);
            throw error;
        }
    };

    const handleAcceptOrder = async (orderId, onSuccessCallback) => {
        try {
            await acceptOrderAPI(orderId);
            if (onSuccessCallback) {
                onSuccessCallback();
            } else {
                await fetchOrders();
            }
        } catch (error) {
            console.error("Accept failed:", error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ orders, loading, fetchOrders, handleCheckout, handleCancelOrder, handleAcceptOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}
