import styled from 'styled-components';

export const HomeContainer = styled.div`
  padding: 1rem;
  background: #f5f5f5;
`;

export const SearchInput = styled.input`
  width: 98.5%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;

  @media (max-width: 600px) {
    width: 95%;
  }

`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columnas en desktop */
  gap: 1rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr); /* 1 columna en móvil */
  }
`;
