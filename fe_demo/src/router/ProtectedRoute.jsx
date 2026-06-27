import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ element }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const hasToken = localStorage.getItem('authToken');
    const isUserLoggedIn = hasToken || isAuthenticated;

    if (!isUserLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
}
