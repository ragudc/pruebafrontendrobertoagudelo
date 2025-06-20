import React from 'react';
import styled from 'styled-components';
import type { Product } from '../interfaces/Product';

interface Props {
  products: Product[];
}

const Section = styled.section`
  padding: 16px;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  justify-content: center;
  /* Móvil: 2 columnas (usando 4 columnas escalares) */
  grid-template-columns: repeat(4, 1fr);
  & > * {
    grid-column: span 2; /* Cada producto ocupa 2 columnas */
  }
  /* Centrar último producto si la cantidad es impar */
  & > *:nth-child(odd):last-child {
    grid-column: 2 / span 2;
  }

  @media (min-width: 600px) {
    /* Pantallas >=600px: grilla fluida con auto-fill */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* Restablecer el span para vista de escritorio */
    & > * {
      grid-column: auto;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
  justify-content: center;
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
  <Section>
    <Grid>
      {products.map((p) => (
        <Card key={p.id}>
          <img src={p.images[0]} alt={p.title} />
          <p>{p.title}</p>
          <p><strong>${p.discountedPrice}</strong></p>
        </Card>
      ))}
    </Grid>
  </Section>
  </>
  
);

export default RelatedProducts;