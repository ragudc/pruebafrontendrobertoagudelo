import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiShoppingBag, FiUser, FiMenu } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import MobileMenu from './MobileMenu';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 0;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.25rem;
  margin: 0;
  padding: 0;

  li {
    cursor: pointer;
    font-weight: 500;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  /* ocultar por debajo de 768 px: solo menú hamburguesa */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    cursor: pointer;
    font-size: 1.35rem;
  }

  .badge {
    position: relative;
  }
  .badge::after {
    content: attr(data-count);
    position: absolute;
    top: -6px;
    right: -8px;
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
    font-size: 0.65rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }

  /* escondemos ícono usuario en pantallas muy pequeñas para ahorrar espacio */
  @media (max-width: 480px) {
    .fi-user {
      display: none;
    }
  }
`;

/* ÁREA HAMBURGUESA SOLO MÓVIL */
const Burger = styled.button`
  background: none;
  border: none;
  font-size: 1.45rem;
  display: none; /* desktop off */

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const { cart, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  document.body.classList.toggle('menu-open', menuOpen);
}, [menuOpen]);

  return (
    <>
      <Bar>
        {/* botón hamburguesa */}
        <Burger aria-label="Abrir menú" onClick={() => setMenuOpen(true)}>
          <FiMenu />
        </Burger>

        {/* Branding */}
        <strong style={{ fontSize: '1.1rem' }}>Mi-Tienda</strong>

        {/* Navegación principal (desktop) */}
        <NavList>
          <li>Mujer</li>
          <li>Hombre</li>
          <li>Guía de Regalos</li>
          <li>Vélez</li>
        </NavList>

        {/* Iconos */}
        <Icons>
          <FiSearch />
          <span className="badge" data-count={cart.length}>
            <FiShoppingBag onClick={toggleCart} />
          </span>
          <FiUser />
        </Icons>
      </Bar>

      {/* Menú móvil */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
