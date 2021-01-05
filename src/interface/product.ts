export interface Product {
  id: string,
  name: string;
  description: string;
  price: number;
}

export type GetListOfProducts = Product[];
export type GetOneProductResponse = Product;
export type CreateProductResponse = Product;
