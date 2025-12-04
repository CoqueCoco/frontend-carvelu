import React, { createContext, useState, useEffect, useContext } from 'react';
import { logout as authLogout } from '../services/AuthService';
import { apiRequest } from '../api/api'; 

// 1. Crear el contexto
export const AuthContext = createContext();

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// 2. Crear el Provider
export const AuthProvider = ({ children }) => {
  // Inicializa el estado del usuario. Almacena el nombre, email, etc.
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // Función que intenta recuperar el perfil del usuario (si hay token)
  const fetchProfile = async () => {
    try {
      const profile = await apiRequest("/auth/profile", "GET");
      // Asume que el endpoint /auth/profile devuelve un objeto { name, email, ... }
      setUser({ name: profile.name, email: profile.email }); 
    } catch (error) {
      console.error("Error al obtener perfil:", error);
      authLogout(); // Si falla, borra el token local por si está expirado o inválido
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Se ejecuta al cargar la aplicación para verificar si hay una sesión activa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        fetchProfile();
    } else {
        setIsLoading(false);
    }
  }, []);

  // Función para establecer el usuario al iniciar sesión (usada en Login.jsx)
  const loginUser = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    authLogout(); // Llama a la función que borra el token de localStorage
    setUser(null);
  };

  // Muestra un cargando mientras verifica si hay sesión (opcional)
  if (isLoading) {
    return <div className="text-center mt-5">Cargando sesión...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};