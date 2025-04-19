import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Si usas React Router

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo o título */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SOPORTE FORDDI V1.0  !! SHYLEY NO RENIEGUESSSS !!
        </Typography>

        {/* Botones de navegación */}
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/usuarios">Lista de Usuarios</Button>
        <Button color="inherit" component={Link} to="/folders">Elimnar Folders</Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;