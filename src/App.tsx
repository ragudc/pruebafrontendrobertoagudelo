import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { CartProvider } from './context/CartContext';

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
      <AppRoutes />          {/* ← aquí renderiza las páginas */}
      <Footer />
    </CartProvider>
  </ThemeProvider>
);

export default App;
