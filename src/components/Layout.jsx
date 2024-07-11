import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const MainContent = styled.main`
  padding: 2rem;
  min-height: calc(100vh - 120px); // Adjust based on header and footer height
  box-sizing: border-box;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
};

export default Layout;
