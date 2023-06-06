export abstract class Product {
    private _id: string;
    private _name: string;
    private _price: number;
    private _vat: number;
    private _image: string;

    constructor(id: string, name: string, price: number, vat: number, image: string){
        this._id = id;
        this._name = name;
        this._price = price;
        this._vat = vat;
        this._image = image;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get vat(): number {
        return this._vat;
    }

    get image(): string {
        return this._image;
    }

    set id(id: string) {
        if (!id) throw new Error("Invalid id");
        this._id = id
    }

    set name(name: string) {
        if (!name) throw new Error("Invalid name");
        this._name = name;
    }

    set price(price: number) {
        if (!price) throw new Error("Invalid price");
        this._price = price;
    }

    set vat(vat: number) {
        if (!vat) throw new Error("Invalid vat");
        this._vat = vat;
    }

    set image(image: string) {
        if (!image) throw new Error("Invalid image")
        this._image = image;
    }
}