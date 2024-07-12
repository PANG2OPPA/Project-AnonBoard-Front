import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
