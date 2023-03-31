import { iDrink as Drink } from "../core/interfaces/drink.interface";
import { iHamburger as Burger } from "../core/interfaces/burger.interface";
import { Size } from "../core/enum/size.enum";

export type Product = Burger | Drink;

export class CartService {

    private _myCart: Array<any>;

    constructor(){
        this._myCart = [];
    }

    addProduct(product: Product, size:Size) {
        const test = {...product};
        this.subTotal(test, size);
        this.myCart.push(test);
    }

    subTotal({price, iva,}: Product, size: Size) {
        if(size === "small") {
            const pricePerSize = price * 1.1;

            return (pricePerSize * iva / 100) + pricePerSize;
        }

        if(size === "medium") {
            const pricePerSize = price * 1.2;

            return (pricePerSize * iva / 100) + pricePerSize;
        }

        if(size === "large") {
            const pricePerSize = price * 1.3;

            return (pricePerSize * iva / 100) + pricePerSize;
        }
    }

    removeProduct(product: Product) {
        const objWithIdIndex = this.myCart.findIndex(({id}) => product.id === id);

        if (objWithIdIndex > -1) {
          this.myCart.splice(objWithIdIndex, 1);
        
        }
    }

    get myCart() {
        return this._myCart;
    }

    set myCart(cart: Array<Product>) {
        this._myCart = cart;
    }
}