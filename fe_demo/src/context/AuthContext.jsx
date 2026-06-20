import { createContext, useContext, useReducer, useMemo } from 'react';
import { reduceForm } from '../reduce/Reduced';

const AuthContext = createContext();

const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    values: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: ''
    },
    errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: ''
    },
    touched: {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        phoneNumber: false,
        address: false
    }
};

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reduceForm, initialState);

    const auth = useMemo(() => ({
        isAuthenticated: state.isAuthenticated,
        state,
        dispatch
    }), [state, dispatch]);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider };