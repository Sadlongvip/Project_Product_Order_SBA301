import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Response interceptor — xử lý lỗi chung
api.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error("API Error:", error.response?.status, error.message)
        return Promise.reject(error)
    }
)



export default api;