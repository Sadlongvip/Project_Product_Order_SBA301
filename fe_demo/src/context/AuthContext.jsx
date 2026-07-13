import { createContext, useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

const loginApi = (data) => api.post('/auth/login', data);
const signupApi = (data) => api.post('/auth/signup', data);

const AuthContext = createContext(null)

function decodeToken(token) {
  try { return JSON.parse(atob(token.split('.')[1])) } catch { return null }
}

export function AuthProvider({ children }) {
  // lazy initializer: đọc localStorage một lần khi mount
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const navigate = useNavigate()
  const currentUser = token ? decodeToken(token) : null

  const login = useCallback(async (email, password) => {
    const res = await loginApi({ email, password })
    const { accessToken } = res.data
    localStorage.setItem('token', accessToken)
    setToken(accessToken)
    navigate('/')
  }, [navigate])

  const signup = useCallback(async (username, email, password, phoneNumber, address) => {
    const res = await signupApi({ username, email, password, phoneNumber, address })
    const { accessToken } = res.data
    localStorage.setItem('token', accessToken)
    setToken(accessToken)
    navigate('/')
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ token, currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth phải dùng trong AuthProvider')
  return ctx
}