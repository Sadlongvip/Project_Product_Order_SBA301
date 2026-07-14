import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';

import AppRouter from './router/AppRouter';
import NavBar from './components/layout/NavBar';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <NavBar />
          <AppRouter />
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
