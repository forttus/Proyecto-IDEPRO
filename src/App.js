import './App.css';
import DatosUsuario from './componentes/dataUsuarios/DatosUsuario';
import EliminacionFolder from './componentes/paginaEliminacion/Eliminacion';
import DeudasCliente from './componentes/paginaEndeudamiento/DeudasCliente';
import Waliky from './componentes/waliky/Waliky';
import Onboarding from './componentes/onboarding/Onboarding';
import Refinanciamiento from './componentes/paginaRefinanciamiento/Refinanciamiento';
import Login from './componentes/paginaLogin/Login';
import ProtectedRoute from './componentes/ProtectedRoute';
import { useAuth } from './context/AuthContext';
// TanStack imports
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './componentes/paginaHome/Home';
import Navbar from './componentes/paginaNavbar/Navbar';
import Inicio from './componentes/paginaInicio/Inicio';

const queryClient = new QueryClient()

function AppContent() {
  const { isAuthenticated, cargando } = useAuth();
  const location = useLocation();

  // No mostrar Navbar en la página de login
  const mostrarNavbar = isAuthenticated && location.pathname !== '/login';

  if (cargando) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <>
      {mostrarNavbar && <Navbar />}
      <Routes>
        {/* Ruta de Login - Sin protección */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/usuarios" element={<ProtectedRoute element={<DatosUsuario />} />} />
        <Route path="/folders" element={<ProtectedRoute element={<EliminacionFolder />} />} />
        <Route path="/Evaluacion" element={<ProtectedRoute element={<DeudasCliente />} />} />
        <Route path="/waliky" element={<ProtectedRoute element={<Waliky />} />} />
        <Route path="/onboarding" element={<ProtectedRoute element={<Onboarding />} />} />
        <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
        <Route path="/refinanciamiento" element={<ProtectedRoute element={<Refinanciamiento />} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;