import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>AnonBoard</Logo>
      <Nav>
        <NavLink to="/boardlist">Board</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
