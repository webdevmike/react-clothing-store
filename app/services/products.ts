import type { Product } from "~/types/product";
import { basePath } from "~/config";

export async function fetchProducts(): Promise<Product[]> {
  // simulate a short delay
  // await new Promise((resolve) => setTimeout(resolve, 300));
  const response = await fetch(`${basePath}api/products.json`);
  const data: { products: Product[] } = await response.json();
  return data.products;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const products = await fetchProducts();
  return products.find((p) => p.id === id) || null;
}
