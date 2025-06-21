export interface Product {
  id: number;
  title: string;
  brand: string;
  SKU: string;
  sizes: number[];            
  color: string;
  fullPrice: number;          
  discountedPrice: number;    
  images: string[];           
  category: string;
  relatedProducts: Product[]; 
}