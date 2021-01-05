import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetListOfProducts, GetOneProductResponse } from "../interface/product";
import { BasketService } from '../basket/basket.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(@Inject(forwardRef(() => BasketService)) private basketService: BasketService,
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<GetListOfProducts> {
    return await this.shopItemRepository.find();
  }
  // getProducts(): GetListOfProducts {
  //   return [
  //     {
  //       name: 'Jogurt',
  //       description: 'Jogobella naklepszym jogurtem',
  //       price: 1.2,
  //     },
  //     {
  //       name: 'Chleb',
  //       description: 'Pieczywo pełnoziarniste',
  //       price: 1.7,
  //     },
  //     {
  //       name: 'Mleko',
  //       description: 'Najlepsze tylko od krowy',
  //       price: 5 - this.basketService.countPromo(),
  //     },
  //   ];
  // }

  async hasProducts(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }
  async getOneProduct(id: string): Promise<GetOneProductResponse> {
    return await this.shopItemRepository.findOneOrFail(id);
  }
  async getPriceOfProduct(name): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }
}
