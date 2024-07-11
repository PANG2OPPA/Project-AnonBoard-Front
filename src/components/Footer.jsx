import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: #f0f2f5;
  color: #333;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      © 2024 AnonBoard. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
