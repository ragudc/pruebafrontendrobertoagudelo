import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';


/*-- Tema opcional: solo colores principales --*/
const theme = {
  colors: {
    primary: '#111',
    accent: '#e60000',
  },
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <CartProvider>
      <Header />
      <ProductPage />
      <Footer />
    </CartProvider>
  </ThemeProvider>
);

export default App;