import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FiX } from 'react-icons/fi';

interface Props {
  open: boolean;
  onClose: () => void;
}

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to   { transform: translateY(0); }
`;

/* contenedor de overlay */
const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  visibility: ${p => (p.open ? 'visible' : 'hidden')};
  opacity: ${p => (p.open ? 1 : 0)};
  transition: opacity 0.25s ease;
  z-index: 1000;
`;

/* panel blanco centrado */
const Panel = styled.nav`
  background: #fff;
  width: 100%;
  max-width: 320px;
  margin-top: 1rem;
  border-radius: 8px;
  animation: ${slideDown} 0.3s ease forwards;
  padding: 2.5rem 1.5rem 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

/* botón X */
const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

/* links verticales */
const MenuLink = styled.a`
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  color: #111;
  letter-spacing: 0.5px;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileMenu: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Overlay open={open} onClick={onClose}>
      {/* detenemos propagación para que el click adentro NO cierre el menú */}
      <Panel onClick={e => e.stopPropagation()}>
        <CloseBtn aria-label="Cerrar menú" onClick={onClose}>
          <FiX />
        </CloseBtn>

        <input
          type="search"
          placeholder="Buscar"
          style={{
            padding: '.6rem 1rem',
            border: '1px solid #ddd',
            borderRadius: 4,
          }}
        />

        <MenuLink href="#">MUJER</MenuLink>
        <MenuLink href="#">HOMBRE</MenuLink>
        <MenuLink href="#"> GUIA DE REGALOS  </MenuLink>
        <MenuLink href="#" style={{ color: 'red' }}>
          OUTLET
        </MenuLink>
        <MenuLink href="#" style={{ fontWeight: 700 }}>
          FLY UP
        </MenuLink>
      </Panel>
    </Overlay>
  );
};

export default MobileMenu;
