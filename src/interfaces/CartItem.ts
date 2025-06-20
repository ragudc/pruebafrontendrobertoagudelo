import type { Product } from './Product';
export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}