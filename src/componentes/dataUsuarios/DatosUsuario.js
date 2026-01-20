import React, { useState, useEffect } from 'react';
import { TextField, Box} from '@mui/material';
import './DatosUsuario.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'; 
import CryptoJS from 'crypto-js';
import CircularWithValueLabel from '../componenteUI/ComponeteCargando';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

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
    minWidth: 56,
    flex: 0.3,
    renderCell: (params) => (
      params.value ? (
        <img
          src={ params.value }
          alt="Foto"
          className="user-image"
          style={imageStyle}
        />
      ) : (
        <img
          src={ rutaImagen }
          alt="Foto"
          className="user-image"
          style={imageStyle}
        />
      )
    ),
  },

  {
    field: 'Login',
    headerName: 'Login',
    minWidth: 100,
    flex: 0.6,
    editable: true,
  },

  {
    field: 'Password',
    headerName: 'Password',
    minWidth: 120,
    flex: 0.8,
    editable: true,
    renderCell: (params) => (
      <span style={{ fontWeight: 'bold', color: 'black' }}>
        {params.value}
      </span>
    ),
  },

  {
    field: 'Nombres',
    headerName: 'Nombre Completo',
    minWidth: 180,
    flex: 2,
    editable: true,
  },

  {
    field: 'Agencia',
    headerName: 'Agencia',
    minWidth: 140,
    flex: 1,
    editable: true,
  },
  {
    field: 'Activo',
    headerName: 'Activo',
    minWidth: 100,
    flex: 0.6,
    editable: true,
    renderCell: (params) => {
      const dat = params.row.Activo ? <CheckOutlinedIcon color="success" sx={{ fontSize: 28 }} /> : <ClearOutlinedIcon color="error" sx={{ fontSize: 28 }} />;
      return dat;
    } // Renderiza el componente HalfRating
  },
];

const DatosUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/usuarios');
        const data = response.data;
  
        const transformedData = data.map((row) => {
          const bytes = CryptoJS.AES.decrypt(row.Password, clave);
          const textoOriginal = bytes.toString(CryptoJS.enc.Utf8);
  
          return {
            ...row,
            Password: textoOriginal,
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
    <Box className="datagrid-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1100px',
        padding: { xs: 2, sm: 3 },
        margin: 'auto',
      }}
    >

      <TextField 
        label="Buscar Usuario"
        variant='outlined'
        margin= 'dense'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black', // color del borde
              borderWidth: '3px',          // grosor del borde
              borderRadius: '12px'
            },
            '&:hover fieldset': {
              borderColor: 'dark',
              borderWidth: '3px',
              borderRadius: '12px'
            },
          },
        }}
      />
      {loading ? (
        <CircularWithValueLabel />
      ) : (
        <DataGrid
          autoHeight
          sx={{ width: '100%', border: '3px solid #333', borderRadius: '15px', padding: '12px' }}
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
          pageSizeOptions={[5, 10, 25]} // Opciones de tamaño de página
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              csvOptions: {
                utf8WithBom: true, // Asegura compatibilidad con caracteres especiales
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default DatosUsuario;