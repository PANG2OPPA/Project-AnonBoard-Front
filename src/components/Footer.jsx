import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  color: #333;
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
