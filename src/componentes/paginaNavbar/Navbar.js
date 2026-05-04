
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Si usas React Router
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo o título */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          SOPORTE 
        </Typography>

        {/* Usuario actual */}
        {usuario && (
          <Typography variant="body2" sx={{ marginRight: 3, color: 'white' }}>
            👤 {usuario.usuario}
          </Typography>
        )}

        {/* Botones de navegación principales */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/inicio" sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
            INICIO
          </Button>
          
       
          {/* Botón Logout */}
          <Button 
            color="inherit" 
            onClick={handleLogout}
            sx={{ 
              marginLeft: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;