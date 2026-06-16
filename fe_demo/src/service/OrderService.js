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
