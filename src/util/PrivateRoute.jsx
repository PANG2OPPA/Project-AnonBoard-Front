import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert('로그인이 필요한 서비스입니다.');
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
