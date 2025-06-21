import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';    // ← usa hook de carrito
import type { Product } from '../interfaces/Product';
import { FiShoppingBag } from 'react-icons/fi';
import SizeSelector from './SizeSelector';

/* -------- estilos -------- */
const Card = styled.div`
  border: 1px solid #ccc;
  padding: 0.5rem;
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AddButton = styled.button`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px;
  transition: opacity 0.2s;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.85;
  }
  @media (min-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`;

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
   const [selectedSize, setSize] = useState<string>('');
  /* accedemos tanto a addToCart como openCart */
  const { addToCart, openCart } = useCart();


  const handleAdd = () => {
    if (!product) return;
    if (!selectedSize) {
    alert('Selecciona una talla antes de continuar.');
    return;
  }
    addToCart({ product, size: selectedSize, quantity: 1 });
    openCart();                
  };

   /* fallback defensivo para arrays */
  const sizes  = product.sizes  ?? [];

  return (
    <Card>
      <Link to={`/producto/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: "100%", height: "350px", objectFit: "cover" }}
        />
        <h3>{product.title}</h3>
      </Link>

      <p style={{ textDecoration: "line-through", color: "#777" }}>
        ${product.fullPrice}
      </p>
      <p style={{ fontWeight: 600 }}>${product.discountedPrice}</p>

      <SizeSelector
            sizes={sizes.map(String)} /* convertimos a string dentro */
            onSelect={setSize}
          />

      <AddButton onClick={handleAdd}>
         <FiShoppingBag />
          Agregar al Carrito
      </AddButton>

    </Card>
  );
};

export default ProductCard;