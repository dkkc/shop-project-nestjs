import {AddProductsDto} from "../basket/dto/add-products.dto";

export type AddProductsToBasket = {
    isSuccess: true,
    index: number,
} | {
    isSuccess: false
}

export interface RemoveProductFromBasket {
    isSuccess: boolean;
}

export type  ListProductsInBasket = AddProductsDto[];
export type GetTotalPrice = number | { isSuccess: false, alternativeBasket: AddProductsDto[]};
