import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import NavBar from './components/layout/NavBar';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
