import './App.css';
import DatosUsuario from './componentes/dataUsuarios/DatosUsuario';
import EliminacionFolder from './componentes/paginaEliminacion/Eliminacion';
import DeudasCliente from './componentes/paginaEndeudamiento/DeudasCliente';
import Waliky from './componentes/waliky/Waliky';
import Onboarding from './componentes/onboarding/Onboarding';
// TanStack imports
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './componentes/paginaHome/Home';
import Navbar from './componentes/paginaNavbar/Navbar';
import Inicio from './componentes/paginaInicio/Inicio';

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="*" element={<Home />} /> */}
            <Route path="/usuarios" element={<DatosUsuario />} />
            <Route path="/folders" element={<EliminacionFolder />} />
            <Route path="/Evaluacion" element={<DeudasCliente />} />
            <Route path="/waliky" element={<Waliky />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/inicio" element={<Inicio />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;