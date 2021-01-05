export interface Product {
  name: string;
  description: string;
  price: number;
}

export type GetListOfProducts = Product[];
export type GetOneProductResponse = Product;
