import React from 'react';
import styled from 'styled-components';
import type { Product } from '../interfaces/Product';

interface Props {
  products: Product[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  /* scroll suave */
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`;

const Card = styled.div`
  min-width: 160px;
  flex: 0 0 auto;
  text-align: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    transition: transform 0.2s;
  }

  &:hover img {
    transform: scale(1.05);
  }

  p {
    margin: 0;
  }
`;

const RelatedProducts: React.FC<Props> = ({ products }) => (
  <>
  <Title>Productos Relacionados</Title>
  <Container>
    <List>
      {products.map((p) => (
        <Card key={p.id}>
          <img src={p.images[0]} alt={p.title} />
          <p>{p.title}</p>
          <p><strong>${p.discountedPrice}</strong></p>
        </Card>
      ))}
    </List>
  </Container>
  </>
  
);

export default RelatedProducts;