import api from "../api/axiosInstance";

export async function getCart() {
    try {
        const res = await api.get("cart");
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getCartById(id) {
    try {
        const res = await api.get(`cart/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addToCart(itemId, accountId) {
    try {
        const res = await api.post(`cart/${accountId}/item/${itemId}`);
        return res.status;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateCart(accountId, itemId, quantity) {
    try {
        const res = await api.put(`cart/${accountId}/item/${itemId}?quantity=${quantity}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function removeFromCart(accountId, itemId) {
    try {
        const res = await api.delete(`cart/${accountId}/item/${itemId}`);
        return res.status;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function clearCart(accountId) {
    try {
        const res = await api.delete(`cart/${accountId}`);
        return res.status;
    } catch (error) {
        console.error(error);
        return null;
    }
}