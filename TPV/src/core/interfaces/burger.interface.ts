import { iIngredient } from "./ingredient.interface";


export class iHamburger {
    id : string;
    name : string;
    price : number;
    iva : number;
    ingredients : iIngredient[];
    photo : string;
}