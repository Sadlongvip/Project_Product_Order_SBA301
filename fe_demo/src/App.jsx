import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import AppRouter from './router/AppRouter';
import NavBar from './components/layout/NavBar';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <NavBar />
          <AppRouter />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
