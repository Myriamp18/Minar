// auth.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const auth = ({ children }) => {
  const [nombreusuario, setNombreUsuario] = useState(null);

  const login = (username) => {
    setNombreUsuario(username);
  };

  const logout = () => {
    setNombreUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ nombreusuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
