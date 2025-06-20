import axios from 'axios';
import type { Product } from '../interfaces/Product';

/**
 * Axios preconfigurado con la URL base del backend.
 */
export const endpoint = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

/**
 * Obtiene el detalle de un producto por ID.
 */
export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await endpoint.get<Product>(`/products/productId/${id}`);
  return data;
};

/**
 * Obtiene productos filtrados (vitrina / relacionados).
 * @param ft string   – filtro de texto (por ejemplo "running")
 */
export const fetchProductsByFilter = async (ft: string): Promise<Product[]> => {
  const { data } = await endpoint.get<Product[]>(`/products`, {
    params: { ft },
  });
  return data;
};