import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);
    if (userId) {
      setIsAuthenticated(true);
      console.log('Authenticated set to true');
    } else {
      setIsAuthenticated(false);
      console.log('Authenticated set to false');
    }
  }, []);

  const login = (userId) => {
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    console.log('Logged in:', userId);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
