import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button,Alert } from '@mui/material';
import axios from 'axios'; 

export default function MultilineTextFields() {
  // Paso 1: Crear un estado para el valor del campo
  const [urls, setUrls] = useState("");
  const [alerta, setAlerta] = useState(false); // Estado para controlar la alerta


  // Función para manejar cambios en el campo de texto
  const handleInputChange = (event) => {
    setUrls(event.target.value); // Actualiza el estado con el valor del campo
  };

  const limpiarDatos = () => {
    setUrls(""); // Limpia el campo de texto
  }

  const procesarDatos = async () => {
    if (urls.length === 0) {
      setAlerta(true); // Muestra la alerta si no hay URLs
      return;
    }
    const idsExtraidos = urls.split("\n").map((url) => {
      const hash = url.split("#")[1];
      const params = new URLSearchParams(hash.split("?")[1]);
      return {
        IdFolder: params.get("id")
      };
    });

    console.log('idsExtraidos', idsExtraidos); // Muestra los IDs extraídos en la consola
 
    setAlerta(false);

    await enviarDatosAlBackend(idsExtraidos);
  };

  const enviarDatosAlBackend = async (arrayIdes) => {
    try {
      // Validar que haya IDs para enviar
      if (arrayIdes.length === 0) {
        console.error("No hay IDs para enviar.");
        alert("No hay IDs para enviar.");
        return;
      }
  
      // URL del endpoint del backend
      const urlBackend = "http://10.0.1.157:3000/api/eliminarFolder";
  
      // Enviar los datos al backend usando Axios
      const response = await axios.post(urlBackend, arrayIdes);
  
      // Mostrar la respuesta del backend
      console.log("Respuesta del backend:", response.data);
      alert("Registros eliminados correctamente.");
    } catch (error) {
      // Manejar errores
      if (error.response) {
        // El servidor respondió con un estado HTTP diferente a 2xx
        console.error("Error del servidor:", error.response.status, error.response.data);
        alert(`Error del servidor: ${error.response.status}`);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("No se recibió respuesta del servidor.");
      } else {
        // Otros errores (por ejemplo, problemas de red)
        console.error("Error al enviar los datos:", error.message);
        alert("Ocurrió un error al enviar los datos.");
      }
    }
  };

  useEffect (() => {
    if (urls.length > 0) {
      setAlerta(false);
    }
  }
  , [urls]); // Se ejecuta cada vez que cambia el estado de ids

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 2, width: '800px' } }}
      noValidate
      autoComplete="off"
    >
      <div>
      {alerta && (
        <Alert variant="filled" severity="error">
          Debes de llenar el campo de texto para continuar
        </Alert>
      )}
        <TextField
          id="outlined-multiline-flexible"
          label="Copie y pegue el texto de las URL's"
          multiline
          maxRows={4}
          value={urls} // Vincula el estado al valor del campo
          onChange={handleInputChange} // Maneja los cambios en el campo
          fullWidth
        />
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ m: 2 }} 
          onClick={procesarDatos}
          >
          
          Eliminar
        
        </Button>

        <Button variant="contained" color="secondary" sx={{ m: 2 }} onClick={limpiarDatos}>
          Limpiar 
        </Button>
       
      </div>
      
    </Box>
  );
}
