import api from "../api/axiosInstance";

// Lấy danh sách đơn hàng theo accountId
export async function getOrdersByAccount(accountId) {
    try {
        const res = await api.get(`orders/${accountId}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Đặt hàng
export async function checkoutOrder(accountId) {
    try {
        const res = await api.post(`orders/checkout/${accountId}`);
        return res.data;
    } catch (error) {
        console.error("Lỗi đặt hàng", error);
        throw error;
    }
}

// Hủy đơn hàng
export async function cancelOrderAPI(orderId) {
    try {
        const res = await api.put(`orders/${orderId}/cancel`);
        return res.data;
    } catch (error) {
        console.error("Lỗi hủy đơn hàng", error);
        throw error;
    }
}

// Chấp nhận đơn hàng (Cho admin/shop)
export async function acceptOrderAPI(orderId) {
    try {
        const res = await api.put(`orders/${orderId}/accept`);
        return res.data;
    } catch (error) {
        console.error("Lỗi duyệt đơn hàng", error);
        throw error;
    }
}
