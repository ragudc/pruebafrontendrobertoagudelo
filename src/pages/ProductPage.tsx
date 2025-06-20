import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import type { Product } from '../interfaces/Product';
import ImageGallery from '../components/ImageGallery';
import SizeSelector from '../components/SizeSelector';
import RelatedProducts from '../components/RelatedProducts';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';
import { FiShoppingBag } from 'react-icons/fi';

/* ---------- estilos de la página ---------- */
const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 100%;
  }
`;

const InfoColumn = styled.section`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0.5rem 0;

  span.original {
    font-size: 1rem;
    color: #777;
    text-decoration: line-through;
    margin-right: 0.5rem;
  }
`;

const ProductPage: React.FC = () => {
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

  &:hover {
    opacity: 0.85;
  }
    @media (min-width: 768px) {
    width: 19%;
  }
`;
  const [product, setProduct]   = useState<Product | null>(null);
  const [related, setRelated]   = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [selectedSize, setSize] = useState<string>('');

  /* contexto carrito */
 const { addToCart, openCart } = useCart();

  /* peticiones a la API */
  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, relRes] = await Promise.all([
          axios.get<Product>('/api/products/productId/1'),
          axios.get<Product[]>('/api/products', {
            params: { ft: 'running' },
          }),
        ]);

        setProduct(prodRes.data);
        setRelated(relRes.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del producto.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* agregar al carrito */
  const agregarAlCarrito = () => {
  if (!product) return;
  if (!selectedSize) {
    alert('Selecciona una talla antes de continuar.');
    return;
  }
  addToCart({ product, size: selectedSize, quantity: 1 });
  openCart();                       // ← abre el sidebar
};

  /* render condicional */
  if (loading) return <p style={{ padding: '2rem' }}>Cargando…</p>;
  if (error || !product) return <p style={{ padding: '2rem' }}>{error || 'Producto no encontrado'}</p>;

  /* fallback defensivo para arrays */
  const images = product.images ?? [];
  const sizes  = product.sizes  ?? [];

  return (
    <>
      <PageWrapper>
        {/* Columna de imágenes */}
        <ImageGallery images={images} />

        {/* Columna de información */}
        <InfoColumn>
          <h1>{product.title}</h1>
          <p>
            <strong>Marca:</strong> {product.brand}
          </p>
          <p>
            <strong>SKU:</strong> {product.SKU}
          </p>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p>
            <strong>Color:</strong> {product.color}
          </p>

          <Price>
            <span className="original">Precio${product.fullPrice}</span>
            Precio con descuento: ${product.discountedPrice}
          </Price>

          <SizeSelector
            sizes={sizes.map(String)} /* convertimos a string dentro */
            onSelect={setSize}
          />

          <AddButton onClick={agregarAlCarrito}>
            <FiShoppingBag />
            Agregar al Carrito
          </AddButton>
        </InfoColumn>
      </PageWrapper>

      {/* Vitrina de productos relacionados */}
      <RelatedProducts products={related} />

      {/* Slide-out / modal del carrito */}
      <Cart />
    </>
  );
};

export default ProductPage;
