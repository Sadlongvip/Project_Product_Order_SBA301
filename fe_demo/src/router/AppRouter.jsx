import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Home from '../pages/home';
import Register from '../components/Register';
import Store from '../pages/store';
import Cart from '../pages/Cart';
import Orders from '../pages/Orders';
import HomeTest from '../pages/homepage_framework';
import ErrorLink from '../pages/ErrorLink';

function ProtectedRoute({ element }) {
    const { isAuthenticated, state } = useAuth();
    const hasToken = localStorage.getItem('authToken');
    const isUserLoggedIn = hasToken || isAuthenticated;

    if (!isUserLoggedIn) {
        return <Navigate to="/login" replace />;
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
                <Route path="/store" element={<ProtectedRoute element={<Store />} />} />
                <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
                <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
                <Route path="/home_test" element={<HomeTest />} />
                <Route path="/errorlink" element={<ErrorLink />} />
                <Route path="*" element={<Navigate to="/errorlink" replace />} />
            </Routes>
        </AuthProvider>
    );
}