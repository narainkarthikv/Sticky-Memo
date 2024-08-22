import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Provide the AuthContext to the app
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate a login function
  const login = () => {
    setIsAuthenticated(true);
  };

  // Simulate a logout function
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
