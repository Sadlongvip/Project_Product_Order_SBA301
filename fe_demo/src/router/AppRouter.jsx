import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Home from '../pages/home';
import HomeV2 from '../pages/HomeV2';
import Register from '../components/Register';
import Store from '../pages/store';
import Cart from '../pages/Cart';
import Orders from '../pages/Orders';
import ErrorLink from '../pages/ErrorLink';
import SettingsUser from '../pages/SettingUser';
function ProtectedRoute({ element }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const hasToken = localStorage.getItem('authToken');
    const isUserLoggedIn = hasToken || isAuthenticated;

    if (!isUserLoggedIn) {
        // Lưu lại trang muốn vào để sau khi login redirect về đúng chỗ
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return element;
}

export default function AppRouter() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/home" element={<ProtectedRoute element={<Home />} />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/home-v2" element={<HomeV2 />} />
                <Route path="/store" element={<ProtectedRoute element={<Store />} />} />
                <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
                <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
                <Route path="/errorlink" element={<ErrorLink />} />
                <Route path="/setting" element={<ProtectedRoute element={<SettingsUser />} />} />
                <Route path="*" element={<Navigate to="/errorlink" replace />} />
            </Routes>
        </AuthProvider>
    );
}