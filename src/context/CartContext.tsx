import {createContext, useContext,useEffect, useState, type PropsWithChildren,} from 'react';
import type { CartItem } from '../interfaces/CartItem';

/* ---------- tipos ---------- */
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}


/* ---------- contexto ---------- */
const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

/* ---------- provider ---------- */
export const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /* --- api pública --- */
  const addToCart = (item: CartItem) => setCart(prev => [...prev, item]);
  const removeFromCart = (index: number) =>
    setCart(prev => prev.filter((_, i) => i !== index));

  const updateQty = (index: number, qty: number) =>
    setCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, qty) } : item,
      ),
    );

  const openCart  = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(o => !o);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};