// Servicio de autenticación
import axios from 'axios';

const API_BASE_URL = 'https://svr-dockerlab.idepro.org/services-soporte/soporte'; // Ajusta según tu API

// Función para hacer login
export const login = async (usuario, password) => {
  try {
    // Opción 1: Si tienes un endpoint específico de login
    // const response = await axios.post(`${API_BASE_URL}/login`, {
    //   usuario,
    //   password
    // });

    // Opción 2: Validación local (para desarrollo)
    // En producción, cambiar por una llamada real a tu API
    if (usuario && password) {
      const userData = {
        id: '1',
        usuario: usuario,
        email: usuario,
        nombre: 'Usuario IDEPRO',
        rol: 'admin'
      };
      
      localStorage.setItem('authToken', 'token_' + Date.now());
      localStorage.setItem('userData', JSON.stringify(userData));
      
      return userData;
    }
    
    throw new Error('Usuario o contraseña inválidos');
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Función para hacer logout
export const logout = () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    return true;
  } catch (error) {
    console.error('Error en logout:', error);
    return false;
  }
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return null;
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  return !!(token && userData);
};

// Función para obtener el token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};
