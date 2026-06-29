import api from "../api/axiosInstance"

export async function getItem(){
    try {
        const res = await api.get("item");
        return Array.isArray(res.data) ? res.data : (res.data?.content || res.data?.data || []);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getItemByShopId(shopId){
    try {
        const res = await api.get(`item/shop/${shopId}`);
        return Array.isArray(res.data) ? res.data : (res.data?.content || res.data?.data || []);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getItemById(id){
    try {
        const res = await api.get(`item/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createItem(item){
    try {
        const res = await api.post("item", item);
        return res.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function updateItem(item){
    try {
        const res = await api.put(`item/${item.id}`, item);
        return res.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function deleteItem(id){
    try {
        const res = await api.delete(`item/${id}`);
        return res.data
    } catch (error) {
        console.error(error)
        return null
    }
}