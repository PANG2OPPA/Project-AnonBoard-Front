import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: white;
  &:hover {
    color: #001327;
  }
`;

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>;
};

export default Logout;
