// LogoutButton.js
import React from 'react';
import { useAuth } from './AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // 로그아웃 후 로그인 페이지로 리디렉션
    window.location.href = '/';
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
