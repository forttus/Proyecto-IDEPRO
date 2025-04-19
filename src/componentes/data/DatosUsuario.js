import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'; // Importamos axios
import CryptoJS from 'crypto-js';
const clave = "PASSWORD";
const rutaImagen = "/imagenes/listaUsuario.png"
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
    width: 160,
    renderCell: (params) => (
      
      params.value ? (
        <img
          src={ params.value ?? rutaImagen }
          alt="Foto"
          style={imageStyle}
        />
      ) : (
        <div style={{ width: '40px', height: '40px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>
      )
    ),
  },
  {
    field: 'Login',
    headerName: 'Login',
    width: 80,
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
    width: 320,
    editable: true,
  },
  
];

const DatosUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.1.157:3000/api/usuarios');
        const data = response.data;
  
        // Transformamos los datos para incluir un campo `id`
        const transformedData = data.map((row) => {
          const bytes = CryptoJS.AES.decrypt(row.Password, clave);
          const textoOriginal = bytes.toString(CryptoJS.enc.Utf8);
  
          return {
            ...row,
            Password: textoOriginal, // opcional: reemplazar el cifrado por el texto plano
            id: row.IdUsuario
          };
        });
  
        setUsuarios(transformedData); // Guardamos los datos en el estado
      } catch (error) {
        console.error('Error al consumir la API:', error);
      }
    };
  
    fetchData(); // Llamamos a la función al cargar el componente
  }, []);
  

  // Filtrado de los datos
  const rowsFiltradas = usuarios.filter((usuario) => {
    const text = busqueda.toLowerCase();
    return (
      (usuario.Login?.toLowerCase() || '').includes(text) ||
      (usuario.Nombres?.toLowerCase() || '').includes(text)
    );
  });

  console.log(usuarios);
  

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <TextField
        label="Buscar Usuario"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <DataGrid
        rows={rowsFiltradas} // Usamos el arreglo filtrado aquí
        columns={columns}
        // getRowId={(row) => row.IdUsuario} 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5, // Número de filas por página
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]} // Opciones de tamaño de página
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

      />
    </Box>
  );
};

export default DatosUsuario;