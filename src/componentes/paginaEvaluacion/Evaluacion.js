import React from 'react';

// BOTONES
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


// Input
import OutlinedInput from '@mui/material/OutlinedInput';


// Corregido: La clase debe extender de React.Component (no Comment)
class ImpuntNoControlado extends React.Component {
  // Corregido: Convención correcta para createRef()
  idEvaluacion = React.createRef();

  handleClick = () => {
    const idEvaluacion = this.idEvaluacion.current.value;
        
    // Manejo de datos
    this.props.onSend(idEvaluacion);
  };

  render() {
    return (
      <div>
               
        <OutlinedInput
            type='text'
            inputRef={ this.idEvaluacion }
            placeholder='ID de la evaluacion'
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
  const send = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1> Búsqueda de evaluaciones y habilitación </h1>
      <ImpuntNoControlado onSend={send} />
    </div>
  );
};