import { Injectable } from '@nestjs/common';
import { GetListOfProducts } from '../interface/product';

@Injectable()
export class ShopService {
  private products: GetListOfProducts = [
    {
      name: 'Jogurt',
      description: 'Jogobella naklepszym jogurtem',
      price: 1.2,
    },
    {
      name: 'Chleb',
      description: 'Pieczywo pełnoziarniste',
      price: 1.7,
    },
    {
      name: 'Mleko',
      description: 'Najlepsze tylko od krowy',
      price: 5,
    },
  ];

  getProducts(): GetListOfProducts {
    return this.products;
  }
  hasProducts(name: string): boolean {
    return this.products.some((item) => item.name === name);
  }
  getPriceOfProduct(name): number {
    return this.products.find((item) => item.name === name).price;
  }
}
