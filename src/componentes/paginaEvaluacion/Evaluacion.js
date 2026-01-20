import React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useMutation } from '@tanstack/react-query';

// Componente clase (sin cambios necesarios)
class ImpuntNoControlado extends React.Component {
  idEvaluacion = React.createRef();

  handleClick = () => {
    const idEvaluacion = this.idEvaluacion.current?.value?.trim();
    if (idEvaluacion) {
      this.props.onSend(idEvaluacion);
    } else {
      alert('Por favor ingrese un número de documento.');
    }
  };

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <OutlinedInput
          type="text"
          inputRef={this.idEvaluacion}
          placeholder="CI del Cliente"
          fullWidth
        />
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={this.handleClick}
        >
          Buscar
        </Button>
      </div>
    );
  }
}

// Componente funcional principal
export const Evaluacion = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://10.0.1.157:3000/api/usuarios').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data.data);
  

  const send = (data) => {
    console.log(data);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Búsqueda de deudas de los clientes</h2>
      <ImpuntNoControlado onSend={send} />

      {mutation.isPending && (
        <div style={{ marginTop: '16px', color: '#1976d2' }}>
          Buscando información del cliente...
        </div>
      )}

      {mutation.isError && (
        <div style={{ color: 'red', marginTop: '16px' }}>
          Error: {mutation.error.message}
        </div>
      )}

      {resultado && !mutation.isPending && (
        <div style={{ marginTop: '24px', padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Cliente encontrado:</h3>
          <p><strong>Nombre:</strong> {resultado.nombres} {resultado.primer_apellido} {resultado.segundo_apellido}</p>
          <p><strong>Documento:</strong> {resultado.numero_documento}</p>
          <p><strong>Teléfono:</strong> {resultado.numero_telefono_domicilio || 'No registrado'}</p>
          <p><strong>Email:</strong> {resultado.email || 'No registrado'}</p>
          
          {resultado.prestamos && resultado.prestamos.length > 0 ? (
            <div>
              <h4>Préstamos:</h4>
              <ul>
                {resultado.prestamos.map((prestamo, index) => (
                  <li key={index}>
                    <strong>N°:</strong> {prestamo.nro_prestamo} | 
                    <strong> Producto:</strong> {prestamo.producto} | 
                    <strong> Estado:</strong> {prestamo.estado}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No tiene préstamos registrados.</p>
          )}
        </div>
      )}
    </div>
  );
};