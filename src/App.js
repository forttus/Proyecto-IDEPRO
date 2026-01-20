import './App.css';
import DatosUsuario from './componentes/dataUsuarios/DatosUsuario';
import EliminacionFolder from './componentes/paginaEliminacion/Eliminacion';
import { Evaluacion } from './componentes/paginaEvaluacion/Evaluacion';
// TanStack imports
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// 👇 Cambiado a HashRouter
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from './componentes/paginaHome/Home';
import Navbar from './componentes/paginaNavbar/Navbar';
import Inicio from './componentes/paginaInicio/Inicio';

const queryClient = new QueryClient();

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
            <Route path="/Evaluacion" element={<Evaluacion />} />
            <Route path="/inicio" element={<Inicio />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;