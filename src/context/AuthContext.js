import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, logout as logoutService, getCurrentUser } from '../services/authService';

// Crear el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Verificar autenticación al montar el componente
  useEffect(() => {
    const usuarioActual = getCurrentUser();
    if (usuarioActual) {
      setIsAuthenticated(true);
      setUsuario(usuarioActual);
    }
    setCargando(false);
  }, []);

  // Función de login
  const login = async (usuarioInput, passwordInput) => {
    try {
      const userData = await loginService(usuarioInput, passwordInput);
      setIsAuthenticated(true);
      setUsuario(userData);
      return userData;
    } catch (error) {
      setIsAuthenticated(false);
      setUsuario(null);
      throw error;
    }
  };

  // Función de logout
  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        usuario,
        cargando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
