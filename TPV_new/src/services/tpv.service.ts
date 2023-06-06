import { ProductDetail } from '../core/interfaces/product-detail.interface';
//import { Product } from '../core/types/product.type';
import { id } from '../core/types/product.type';

export class TpvService {
    private _products: Map<id, ProductDetail>;
    private _totalPrice: number;
    private _API: string = "http://localhost:3000/products";

    constructor(){
        this._products = new Map<id, ProductDetail>();
        this._totalPrice = 0;
    }

    loadProducts = async () => {
        const response = await fetch(this.API);
        const data = await response.json();
        return data;
    }

    addProduct = ({quantity, product}: ProductDetail) => {
        console.log(product);
        /* es undefined porque todavia no hay ningun producto en el MAPS
         habría que mapear los datos del backend para agregarlos y hacer la comprobación*/
        if (this._products.has(product.id)) {
            const idProduct = this._products.get(product.id);
            idProduct!.quantity = idProduct!.quantity + 1;
        } else {
            this._products.set(`${product.id}`, {quantity, product});
        }
    }

    remove = ({quantity, product}: ProductDetail) => {
        if(this._products.has(product.id)){
            const idProduct = this._products.get(product.id);
            idProduct!.quantity = idProduct!.quantity - 1;   
        } else {
            this._products.delete(product.id);
        }
        /* const {id} = product;
        this._products.delete(id); */
    }

    removeAll = () => {
        this._products.clear();
    }

    calculateTotalPrice = () => {
        for (const product of this.products) {
            const {price} = product;
            this._totalPrice += price;
        }
    }

    get products(): Array<any> {
        return Array.from(this._products.values());
    }

    get totalPrice(): number {
        return this._totalPrice;
    }

    get API(): string {
        return this._API;
    }
}