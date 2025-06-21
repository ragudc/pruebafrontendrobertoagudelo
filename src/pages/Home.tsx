import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  HomeContainer,
  SearchInput,
  ProductsGrid,
} from '../styles/homeStyles';
import type { Product } from '../interfaces/Product';
import ProductCard from '../components/ProductCard';


const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------ petición a la API con Axios ------------ */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get<Product[]>('/api/products'); // proxy en vite.config.ts
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar productos.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  /* ------------ búsqueda en tiempo real ------------ */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  /* ------------ render ------------ */
  if (loading) return <p style={{ padding: '1rem' }}>Cargando productos…</p>;
  if (error) return <p style={{ padding: '1rem' }}>{error}</p>;

  return (
    <HomeContainer>
      <SearchInput
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <ProductsGrid>
        {filteredProducts.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </ProductsGrid>
    </HomeContainer>
  );
};

export default Home;
