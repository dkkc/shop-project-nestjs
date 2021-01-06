import {
  Body,
  Controller, Delete,
  Get,
  HostParam,
  Inject,
  Param, Post,
  Redirect,
  Scope,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import {CreateProductResponse, GetListOfProducts, GetOneProductResponse} from "../interface/product";

// @Controller('shop')
@Controller({
  path: '/shop',
  // host: ':name.lvh.me'
  // scope: Scope.REQUEST // dla każdego zapytania stworzony będzie osobny objekt
})
export class ShopController {
  // onModuleInit(){
  // }

  onApplicationBootstrap() {
    console.log('Załadowany');
  }
  onApplicationShutDown() {
    console.log('Apka zaraz zakończy działanie');
  }
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  geListOfProducts(): Promise<GetListOfProducts> {
    return this.shopService.getProducts();
  }

  @Get('/find/:searchTerm')
  advancedFindItemTest(@Param('searchTerm') searchTerm: string): Promise<GetListOfProducts> {
    return this.shopService.findProducts(searchTerm);
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  removedProduct(@Param('id') id: string) {
    return this.shopService.removedProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }

  // @Get('/welcome')
  // // @Redirect()
  // testRedirect(@HostParam('name') hostName: string) {
  //   // const url = Number(age) > 18 ? '/site' : '/block';
  //   // return {
  //   //   url,
  //   //   statusCode: 301
  //   // }
  //   return `Witaj w sklepie ${hostName}`;
  // }
}
