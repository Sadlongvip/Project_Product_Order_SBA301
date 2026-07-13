import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ element }) {
    const { token } = useAuth();
    const location = useLocation();
    const isUserLoggedIn = !!token;

    if (!isUserLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
}
