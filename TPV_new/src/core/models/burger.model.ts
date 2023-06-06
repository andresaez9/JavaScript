import { Product } from "./product.model";

export class Burger extends Product {
    private _ingredients: [];
    private _vegetarian: boolean;
    private _gluten: boolean;

    constructor(
        id: string, name: string, price: number, vat: number,
        image: string, ingredients: [], vegetarian: boolean,
        gluten: boolean
        ){
        super(id, name, price, vat, image);
        this._ingredients = ingredients;
        this._vegetarian = vegetarian;
        this._gluten = gluten
    }

    get ingredients(): [] {
        return this._ingredients;
    }
    

    get vegetarian(): boolean {
        return this._vegetarian;
    }

    get gluten(): boolean {
        return this._gluten;
    }

    set ingredients(ingredients: []) {
        if (!ingredients) throw new Error("Invalid ingredients");
        this._ingredients = ingredients;
    }

    set vegetarian(vegetarian: boolean) {
        if (!vegetarian) throw new Error("Invalid isVegetarian");
        this._vegetarian = vegetarian;
    }

    set gluten(gluten: boolean) {
        if (!gluten) throw new Error("Invalid gluten");
        this._gluten = gluten;
    }
}