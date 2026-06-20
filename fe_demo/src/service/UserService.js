import api from "../api/axiosInstance";

export async function getUser(id) {
    try{
        const response = await api.get(`/auth/users/${id}`);
        return response.data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}
export async function updateUser(userData) {
    try {
        const response = await api.put(`/auth/users`, userData);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}