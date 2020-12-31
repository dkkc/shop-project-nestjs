import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductsDto } from './dto/add-products.dto';
import {
  AddProductsToBasket,
  GetTotalPrice,
  ListProductsInBasket,
  RemoveProductFromBasket,
} from '../shop/interface/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  addItemsToBasket(@Body() item: AddProductsDto): AddProductsToBasket {
    return this.basketService.addItem(item);
  }

  @Get('/')
  getItems(): ListProductsInBasket {
    return this.basketService.getItems();
  }

  @Get('/total-price')
  getTotalPrice(): GetTotalPrice {
    return this.basketService.getTotalPrice();
  }

  @Delete('/:index')
  removeProductFromBasket(
    @Param('index') index: string,
  ): RemoveProductFromBasket {
    return this.basketService.removeItem(Number(index));
  }
}
