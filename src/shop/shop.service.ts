import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {CreateProductResponse, GetListOfProducts, GetOneProductResponse} from "../interface/product";
import { BasketService } from '../basket/basket.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(@Inject(forwardRef(() => BasketService)) private basketService: BasketService,
  ) {}

  async getProducts(): Promise<GetListOfProducts> {
    // return await this.shopItemRepository.find();
    // Active Record
    return await ShopItem.find();
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
    return await ShopItem.findOneOrFail(id);
  }
  async getPriceOfProduct(name): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }
  async removedProduct(id: string) {
    return await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<CreateProductResponse> {
    const newItem = new ShopItem();
    newItem.price = 4.55;
    newItem.name = 'Okocim Mocne 0.5L';
    newItem.description = 'Okcim czrne dubeltowe';

    // await this.shopItemRepository.save(newItem);
    await newItem.save() // encja sama się zapisuje gdy diedziczy po BaseEntity - nie ma potzreby używać repozytorium
    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true,
    })
    const item = await ShopItem.findOneOrFail(id);
    item.boughtCounter++;
    await item.save();
  }

  async findProducts(searchTerm: string): Promise<GetListOfProducts> {
    return await ShopItem.find({
      order: {
        price: 'DESC'
      }
      // select: ['id', 'price'],
      // where: {
      //   description: searchTerm
      // }

    })
  }
}
