import React, { createContext, useState, useEffect, useContext } from 'react';
import { logout as authLogout } from '../services/AuthService';
import { apiRequest } from '../api/api'; 

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario y puntos guardados "localmente" para la demo
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Recuperamos los puntos guardados en el navegador (Simulación de DB)
    const savedPoints = localStorage.getItem('demo_points');
    const savedName = localStorage.getItem('demo_name'); // Opcional, si tienes el nombre guardado

    if (token) {
       // Si hay token, asumimos que está logueado y restauramos los datos visuales
       setUser({ 
           email: "usuario@demo.com", // Email dummy o decodificado si quieres
           name: savedName || "Cliente",
           points: savedPoints ? parseInt(savedPoints) : 0 
       });
    }
    setIsLoading(false);
  }, []);

  const loginUser = (userData) => {
    // Al hacer login, guardamos el nombre para mostrarlo
    localStorage.setItem('demo_name', userData.name || "Cliente");
    setUser({ ...userData, points: 0 }); // Inicia con 0 puntos o los que tenga
  };

  // ✅ ESTA ES LA MAGIA: Guardamos los puntos en el navegador
  const addPoints = (amount) => {
    setUser((prev) => {
      const currentPoints = prev?.points || 0;
      const newTotal = currentPoints + amount;
      
      // Persistir en localStorage para que no se borren al refrescar
      localStorage.setItem('demo_points', newTotal);
      
      return { ...prev, points: newTotal };
    });
  };

  const logout = () => {
    authLogout(); 
    localStorage.removeItem('demo_points'); // Limpiamos puntos al salir (opcional)
    localStorage.removeItem('demo_name');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, addPoints }}>
      {children}
    </AuthContext.Provider>
  );
};