import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BasketController } from './basket/basket.controller';
import { ShopController } from './shop/shop.controller';
import { AppService } from './app.service';
import { BasketService } from './basket/basket.service';
import { ShopService } from './shop/shop.service';
import {BasketModule} from "./basket/basket.module";
import {ShopModule} from "./shop/shop.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
      BasketModule,
      ShopModule,
      UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
