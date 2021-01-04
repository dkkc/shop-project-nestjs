import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { GetListOfProducts } from '../interface/product';
import { BasketService } from "../basket/basket.service";

@Injectable()
export class ShopService {

  constructor(@Inject(forwardRef(() => BasketService)) private basketService: BasketService) {
  }
  getProducts(): GetListOfProducts {
    return [
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
        price: 5 - this.basketService.countPromo(),
      },
    ]
  }

  hasProducts(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }
  getPriceOfProduct(name): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
