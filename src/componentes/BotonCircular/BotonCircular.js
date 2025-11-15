
import './BotonCircular.css';

const BotonCircular = ({ icono, texto, colorFondo, onClick, to, component: Component = 'div' }) => {
  const style = { backgroundColor: colorFondo, textDecoration: 'none' };

  if (to) {
    return (
      <Component to={to} className="boton-circular" style={style} onClick={onClick}>
        <div className="icono-contenedor">
          {icono}
        </div>
        <div className="texto-boton">
          {texto}
        </div>
      </Component>
    );
  }

  return (
    <div className="boton-circular" style={style} onClick={onClick}>
      <div className="icono-contenedor">
        {icono}
      </div>
      <div className="texto-boton">
        {texto}
      </div>
    </div>
  );
};

export default BotonCircular;