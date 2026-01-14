
import BotonCircular from '../BotonCircular/BotonCircular';
import { Link } from "react-router-dom";
import usuarioImg from '../../assets/usuarios.png';
import refiImg from '../../assets/refi.png';
import folderesImg from '../../assets/folders.png';
import './Inicio.css';

const Inicio = () => {
  return (
    <nav className="inicio-container" aria-label="Panel de inicio">
      <BotonCircular
        icono={<img src={folderesImg} alt="Ícono folders" className="inicio-icon" />}
        texto="Folders"
        component={Link}
        to="/folders"
      />

      <BotonCircular
        icono={<img src={refiImg} alt="Ícono préstamos" className="inicio-icon" />}
        texto="Préstamos"
        component={Link}
        to="/Evaluacion"
      />

      <BotonCircular
        icono={<img src={usuarioImg} alt="Ícono usuarios" className="inicio-icon" />}
        texto="Usuarios"
        component={Link}
        to="/usuarios"
      />
    </nav>
  );
};

export default Inicio;