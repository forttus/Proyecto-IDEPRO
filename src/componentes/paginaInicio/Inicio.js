
import BotonCircular from '../BotonCircular/BotonCircular';
import { Link } from "react-router-dom";
import usuarioImg from '../../assets/usuarios.png';
import refiImg from '../../assets/refi.png';
import folderesImg from '../../assets/folders.png';
const Inicio = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px', textDecoration: 'none'}}>
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
    </div>
  );
};

export default Inicio;