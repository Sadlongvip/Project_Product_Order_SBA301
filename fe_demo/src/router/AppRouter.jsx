import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../pages/home';
import HomeV2 from '../pages/HomeV2';
import Register from '../components/Register';
import Store from '../pages/store';
import Cart from '../pages/Cart';
import Orders from '../pages/Orders';
import ErrorLink from '../pages/ErrorLink';
import SettingsUser from '../pages/SettingUser';
import Shop from '../pages/Shop';
import { ShopProvider } from '../context/ShopContext';
import ProtectedRoute from './ProtectedRoute';
import FormItem from '../components/FormItem';
export default function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/home-v2" element={<HomeV2 />} />
            <Route path="/store" element={<ProtectedRoute element={<Store />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
            <Route path="/errorlink" element={<ErrorLink />} />
            <Route path="/setting" element={<ProtectedRoute element={<SettingsUser />} />} />

            <Route path="/shop" element={<ProtectedRoute element={<ShopProvider><Outlet /></ShopProvider>} />}>
                <Route index element={<Shop />} />
                <Route path="item/:id" element={<FormItem />} />
            </Route>

            <Route path="*" element={<Navigate to="/errorlink" replace />} />
        </Routes>
    );
}