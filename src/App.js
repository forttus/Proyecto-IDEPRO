import './App.css';
import DatosUsuario from './componentes/dataUsuarios/DatosUsuario';
import EliminacionFolder from './componentes/paginaEliminacion/Eliminacion';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './componentes/paginaHome/Home';
import Navbar from './componentes/paginaNavbar/Navbar';

function App() {
  return (
    <>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="/usuarios" element={<DatosUsuario />} />
        <Route path="/folders" element={<EliminacionFolder />} />
      </Routes>
    </Router>
   
    </>
  );
    
}

export default App;
