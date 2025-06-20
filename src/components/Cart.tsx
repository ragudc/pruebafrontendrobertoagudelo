import React from 'react';
import styled from 'styled-components';
import { FiX, FiTrash, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

/* ------------ estilos ------------- */
const CartContainer = styled.aside<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: ${p => (p.open ? '0' : '-100%')};
  width: min(100vw, 320px);
  height: 100vh;
  background: #f9f9f9;
  border-left: 1px solid #ccc;
  padding: 1rem;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;
  z-index: 998;
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

  .qty-control {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.3rem;

    button {
      background: none;
      border: 1px solid #ddd;
      width: 22px;
      height: 22px;
      display: grid;
      place-items: center;
      cursor: pointer;
      border-radius: 4px;
      font-size: 0.7rem;
    }

    span {
      min-width: 20px;
      text-align: center;
      font-size: 0.8rem;
    }
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

const Summary = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
`;

const CheckoutBtn = styled.button`
  margin-top: 0.6rem;
  padding: 0.7rem 1.5rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  width: 100%;

  &:hover {
    opacity: 0.85;
  }

  @media (min-width: 480px) {
    width: 80%;
    align-self: center;
  }
`;

/* ------------ componente ------------- */
const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQty,
    isOpen,
    closeCart,
  } = useCart();

  const subtotal = cart.reduce(
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
            <div className="qty-control">
              <button onClick={() => updateQty(idx, item.quantity - 1)}>
                <FiMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQty(idx, item.quantity + 1)}>
                <FiPlus />
              </button>
            </div>
            <p>
              ${(item.product.discountedPrice * item.quantity).toFixed(2)}
            </p>
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
        <Summary>
           <span>
             <strong>Total: ${subtotal.toFixed(2)}</strong>
            </span>
          <CheckoutBtn>Finalizar Compra</CheckoutBtn>
        </Summary>
      )}
    </CartContainer>
  );
};

export default Cart;
