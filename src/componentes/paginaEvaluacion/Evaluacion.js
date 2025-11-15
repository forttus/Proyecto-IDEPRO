import React from 'react';

// BOTONES
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import OutlinedInput from '@mui/material/OutlinedInput';
import { useQuery } from '@tanstack/react-query';

class ImpuntNoControlado extends React.Component {
  // Corregido: Convención correcta para createRef()
  idEvaluacion = React.createRef();

  handleClick = () => {
    const idEvaluacion = this.idEvaluacion.current.value;
    this.props.onSend(idEvaluacion);
  };

  render() {
    return (
      <div>
               
        <OutlinedInput
            type='text'
            inputRef={ this.idEvaluacion }
            placeholder='CI del Cliente'
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
    <div>
      <h2> Búsqueda de deudas de los clientes </h2>
      <ImpuntNoControlado onSend={send} />
    </div>
  );
};