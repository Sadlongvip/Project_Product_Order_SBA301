import api from "../api/axiosInstance";

// Lấy danh sách tất cả shop
export async function getShop() {
    try {
        const res = await api.get("shop");
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Lấy shop theo ID
export async function getShopById(id) {
    try {
        const res = await api.get(`shop/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Tạo mới shop
export async function createShop(shop) {
    try {
        const res = await api.post("shop", shop);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Cập nhật shop theo ID
export async function updateShop(id, shop) {
    try {
        const res = await api.put(`shop/${id}`, shop);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Xóa shop theo ID
export async function deleteShop(id) {
    try {
        const res = await api.delete(`shop/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// get shop by account id
export async function getShopByAccountId(accountId) {
    try {
        const res = await api.get(`shop/account/${accountId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

