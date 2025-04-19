import './App.css';
import Button from '@mui/material/Button';
import DatosUsuario from './componentes/data/DatosUsuario';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Usuarios FRODDI</h1>
      </header>
      <DatosUsuario></DatosUsuario>
    </div>
  );
}

export default App;
