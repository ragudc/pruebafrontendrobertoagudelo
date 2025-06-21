import React from 'react';
import styled from 'styled-components';

/* ----- estilos ----- */
const Bar = styled.footer`
  width: 100%;
  text-align: center;
  background: #000000;
  color: #FFFFFF;
  font-size: 0.85rem;
  padding: 1rem 0;
  margin-top: 3rem;

  /* sombreado sutil */
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    font-size: 0.9rem;
    padding: 1.2rem 0;
  }
`;

const Footer: React.FC = () => (
  <Bar>
    © {new Date().getFullYear()} | Powered By&nbsp;<strong> Roberto Agudelo </strong>
  </Bar>
);

export default Footer;