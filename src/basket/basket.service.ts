import {Inject, Injectable} from '@nestjs/common';
import {AddProductsDto} from "./dto/add-products.dto";
import {
    AddProductsToBasket,
    GetTotalPrice,
    ListProductsInBasket,
    RemoveProductFromBasket
} from "../shop/interface/basket";
import { ShopService } from "../shop/shop/shop.service";

@Injectable()
export class BasketService {
    private items: AddProductsDto[] = []

    constructor(@Inject(ShopService) private shopService: ShopService ) {
    }

    addItem(item: AddProductsDto): AddProductsToBasket {
        const {count, name} = item;
        if(typeof  name !== 'string' || typeof count !== 'number' || name === '' || count < 1 ) {
            return {
                isSuccess: false,
            }
        }
        this.items.push(item);
        return {
            isSuccess: true,
            index: this.items.length -1,
        }
    }

    getItems(): ListProductsInBasket {
        return this.items
    }
    removeItem(index: number): RemoveProductFromBasket {
        const {items} = this;
        if (index < 0 || index >= items.length ) {
            console.log(`index ${index} nie istnieje`)
            return {
                isSuccess: false
            }
        }
        items.splice(index, 1);
        return  {
            isSuccess: true,
        }
    }

    getTotalPrice(): GetTotalPrice {
        if(!this.items.every(item => this.shopService.hasProducts(item.name))){
            const alternativeBasket = this.items.filter(item => this.shopService.hasProducts(item.name))
            return  {
                isSuccess: false,
                alternativeBasket
            }
        }
        return this.items
            .map(item => this.shopService.getPriceOfProduct(item.name) * item.count * 1.23)
            .reduce((prev, curr) => prev + curr, 0);
    }
}
