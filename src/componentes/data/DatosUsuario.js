import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, CircularProgress} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'; 
import CryptoJS from 'crypto-js';
import CircularWithValueLabel from '../ComponeteCargando';

const clave = "PASSWORD";
const rutaImagen = "imagenes/usuario.png"

const imageStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid #ccc',
};

const columns = [
  {
    field: 'Foto',
    headerName: 'Foto',
    width: 60,
    renderCell: (params) => (
      
      params.value ? (
        <img
          src={ params.value }
          alt="Foto"
          style={imageStyle}
        />
      ) : (
        <img
          src={ rutaImagen }
          alt="Foto"
          style={imageStyle}
        />
      )
    ),
  },
  {
    field: 'Login',
    headerName: 'Login',
    width: 120,
    editable: true,
  },
  {
    field: 'Password',
    headerName: 'Password',
    width: 150,
    editable: true,
  },
  {
    field: 'Nombres',
    headerName: 'Nombre Completo',
    width: 380,
    editable: true,
  },
  
];

const DatosUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.1.157:3000/api/usuarios');
        const data = response.data;
  
        const transformedData = data.map((row) => {
          const bytes = CryptoJS.AES.decrypt(row.Password, clave);
          const textoOriginal = bytes.toString(CryptoJS.enc.Utf8);
  
          return {
            ...row,
            Password: textoOriginal
          };
        });
  
        setUsuarios(transformedData); 
      } catch (error) {
        console.error('Error al consumir la API:', error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
  
    fetchData(); // Llamamos a la función al cargar el componente
  }, []);
  
  const rowsFiltradas = usuarios.filter((usuario) => {
    const text = busqueda.toLowerCase();
    return (
      (usuario.Login?.toLowerCase() || '').includes(text) ||
      (usuario.Nombres?.toLowerCase() || '').includes(text)
    );
  });

  return (
    <Box className="datagrid-container" >

      <TextField
        label="Buscar Usuario"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {loading ? (<CircularWithValueLabel/>):(
        <DataGrid
        rows={rowsFiltradas} // Usamos el arreglo filtrado aquí
        columns={columns}
        getRowId={(row) => row.IdUsuario} 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5, // Número de filas por página
            },
          },
        }}
        pageSizeOptions={[5, 10,25,]} // Opciones de tamaño de página
        slots={{
          toolbar: GridToolbar, // Agregamos el toolbar con el botón de exportación
        }}
        slotProps={{
          toolbar: {
            csvOptions: {
              utf8WithBom: true, // Asegura compatibilidad con caracteres especiales
            },
          },
        }}
      />)}
    </Box>
  );
};

export default DatosUsuario;