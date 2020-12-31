import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BasketController } from './basket/basket.controller';
import { ShopController } from './shop/shop.controller';
import { AppService } from './app.service';
import { BasketService } from './basket/basket.service';
import { ShopService } from './shop/shop.service';

@Module({
  imports: [],
  controllers: [AppController, BasketController, ShopController],
  providers: [AppService, BasketService, ShopService],
})
export class AppModule {}
