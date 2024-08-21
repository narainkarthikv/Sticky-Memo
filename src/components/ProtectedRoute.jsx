import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ element: Component }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? Component : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
