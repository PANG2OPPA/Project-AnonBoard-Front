import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logout from './user/Logout';
import logo from '../icon/Logo(white).png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: white;
`;

const Logo = styled.img`
  width: 150px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center; /* 추가: 아이템들을 수직으로 가운데 정렬 */
`;

const NavLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  color: white;
  &:hover {
    color: #001327;
  }
`;

const UserGreeting = styled.div`
  color: white;
`;

const Header = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <HeaderContainer>
      <Logo src={logo} alt="AnonBoard 로고" />
      <Nav>
        {userId && <UserGreeting>{userId}님</UserGreeting>}
        <NavLink to="/mypage">마이페이지</NavLink>
        <Logout />
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
