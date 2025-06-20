import React from 'react';
import styled from 'styled-components';
import { FiX, FiTrash } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartContainer = styled.aside<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: ${p => (p.open ? '0' : '-100%')};   /* ← truco */
  width: min(100vw, 320px);
  height: 100vh;
  background: #f9f9f9;
  border-left: 1px solid #ccc;
  padding: 1rem;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;        /* ← animación suave */
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CartItemRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
  }

  .info {
    flex: 1;
    font-size: 0.85rem;
  }

  .remove {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #666;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;
const CheckoutBtn = styled.button`           
  align-self: center;            
  padding: 0.7rem 1.5rem;
  background: #000;              
  color: #fff;                   
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;


const Cart: React.FC = () => {
  const { cart, removeFromCart, isOpen, closeCart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0,
  );

  return (
    <CartContainer open={isOpen}>
      <CloseBtn onClick={closeCart}>
        <FiX />
      </CloseBtn>

      <h2 style={{ marginTop: '2rem' }}>Carrito de Compras</h2>

      {cart.length === 0 && <p>El carrito está vacío.</p>}

      {cart.map((item, idx) => (
        <CartItemRow key={idx}>
          <img src={item.product.images[0]} alt={item.product.title} />
          <div className="info">
            <p>{item.product.title}</p>
            <p>Talla: {item.size}</p>
            <p>${item.product.discountedPrice}</p>
          </div>
          <button
            className="remove"
            onClick={() => removeFromCart(idx)}
            aria-label="Eliminar"
          >
            <FiTrash />
          </button>
        </CartItemRow>
      ))}

      {cart.length > 0 && (
        <>
          <p style={{ fontWeight: 600 }}>
          Total:&nbsp;${total.toFixed(2)}
        </p>
        <CheckoutBtn>Finalizar Compra</CheckoutBtn>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
