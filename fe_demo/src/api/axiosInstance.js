import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — tự động gắn JWT token vào header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE: token hết hạn → xóa → redirect login
api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api;