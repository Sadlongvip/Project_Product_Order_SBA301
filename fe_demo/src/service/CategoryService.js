import api from "../api/axiosInstance";

export async function getCategory(){
    try {
        const res = await api.get("category");
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}