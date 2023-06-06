import { Burger } from "../models/burger.model";
import { Drink } from "../models/drink.model";

export const burgerTemplate = (
    {
    id, name, price, vat, image, 
    ingredients, vegetarian, gluten
    }: Burger
    ): string => {
    return `
        <section class="product" data-id="${id}">
            <section class="product-image">
                <img src="${image}"/>
            </section>
            <section class="product-info">
                <h2>${name}</h2>
                <h3>Precio: <span>${price}</span></h3>
                <h3>IVA: <span>${vat}%</span></h3>
                <p>Ingredientes: <span>${showIngredients(ingredients)}</span></p>
                <p>Vegetariana: <span>${vegetarian}</span></p>
                <p>Gluten: <span>${gluten}</span></p>
            </section>
            <button class="btn-add" id="btnAddBurger-${id}"><i class="fa-solid fa-cart-arrow-down"></i></button>
        </section>
    `;
}

export const drinkTemplate = ({id, name, price, vat, image, sugar}: Drink): string => {
    return `
    <section class="product" data-id="${id}">
        <section class="product-image">
            <img src="${image}"/>
        </section>
        <section class="product-info">
            <h2>${name}</h2>
            <h3>Precio: <span>${price}</span></h3>
            <h3>IVA: <span>${vat}%</span></h3>
            <p>Azucar: <span>${sugar}</span></p>
        </section>
        <button class="btn-add" id="btnAddDrink-${id}"><i class="fa-solid fa-cart-arrow-down"></i></button>
    </section>
    `;
}

const showIngredients = (ingredients: Array<any>) => {
    let allIngredients: string = "";
    for (const {name} of ingredients){
        allIngredients += name;        
    }
    return allIngredients;
}