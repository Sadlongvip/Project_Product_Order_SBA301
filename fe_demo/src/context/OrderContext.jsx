import { createContext, useContext, useReducer, useMemo } from 'react';
import { reduceOrderForm } from '../reduce/Reduced';

const OrderContext = createContext();

const initialState = {
    value: {
        name: "",
        quantity: 0,
        price: 0,
        image: "",
        category: ""
    },
    errors: {
        name: "",
        quantity: "",
        price: "",
        image: "",
        category: ""
    },
    touched: {
        name: false,
        quantity: false,
        price: false,
        image: false,
        category: false
    }
};


function OrderProvider({ children }) {
    const [state, dispatch] = useReducer(reduceOrderForm, initialState);

    const order = useMemo(() => ({
        isAuthenticated: state.isAuthenticated,
        state,
        dispatch
    }), [state, dispatch]);

    return (
        <OrderContext.Provider value={order}>
            {children}
        </OrderContext.Provider>
    );
}

function useOrder() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}

export { useOrder, OrderProvider };
