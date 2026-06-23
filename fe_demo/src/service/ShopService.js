import api from "../api/axiosInstance";

// Lấy danh sách tất cả shop
export async function getShop() {
    try {
        const res = await api.get("shop");
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Lấy shop theo ID
export async function getShopById(id) {
    try {
        const res = await api.get(`shop/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Tạo mới shop
export async function createShop(shop) {
    try {
        const res = await api.post("shop", shop);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Cập nhật shop theo ID
export async function updateShop(id, shop) {
    try {
        const res = await api.put(`shop/${id}`, shop);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Xóa shop theo ID
export async function deleteShop(id) {
    try {
        const res = await api.delete(`shop/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
