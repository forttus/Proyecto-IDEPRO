
import BotonCircular from '../BotonCircular/BotonCircular';
import { Link } from "react-router-dom";
import usuarioImg from '../../assets/usuarios.png';
import refiImg from '../../assets/refi.png';
import folderesImg from '../../assets/folders.png';
const Inicio = () => {
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px', textDecoration: 'none'}}>
      <BotonCircular
        style={{ textDecoration: 'none' }}
        icono={<img src={folderesImg} />}
        texto="FOLDERS"
        component={Link} 
        to="/folders"
      />
      <BotonCircular
        icono={<img src={refiImg} />}
        texto="PRESTAMOS"
        component={Link}
        to="/Evaluacion"
        />
      <BotonCircular
        icono={<img src={usuarioImg} />}
        texto="USUARIOS"
        component={Link} 
        to="/usuarios"
        
      />
    </div>
  );
};

export default Inicio;