import { Product } from "./product.model";

export class Drink extends Product {
    private _sugar: boolean;

    constructor(
        id: string,
        name: string,
        price: number,
        vat: number,
        image: string,
        sugar: boolean
    ){
        super(id, name, price, vat, image);
        this._sugar = sugar;
    }

    get sugar(): boolean {
        return this._sugar;
    }

    set sugar(hasSugar: boolean){
        if (!hasSugar) throw new Error("Invalid sugar");
        this._sugar = hasSugar;
    }
}