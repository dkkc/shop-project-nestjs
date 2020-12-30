import {Controller, Get, Inject} from '@nestjs/common';
import {ShopService} from "./shop.service";
import {GetListOfProducts} from "../interface/product";

@Controller('shop')
export class ShopController {
    constructor(@Inject(ShopService) private shopService: ShopService) {}

    @Get('/')
    geListOfProducts(): GetListOfProducts
    {
        return this.shopService.getProducts()
    }
}
