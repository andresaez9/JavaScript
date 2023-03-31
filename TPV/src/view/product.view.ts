import { Size } from "../core/enum/size.enum";
import { IElements } from "../core/interfaces/elements.interface";

export class ProductView {
    private elements: IElements = {
        header: document.querySelector('#header'),
        main: document.querySelector('#container'),
        cart: document.querySelector('#cart'),
        footer: document.querySelector('#footer')
    }

    constructor(){}

    renderProducts = async (dataProducts: Promise<any>, addProduct: Function) => {
        const {drinks, burgers} = await dataProducts;

        this.showBurgers(burgers, addProduct);
        this.showDrinks(drinks, addProduct);
    }

    private showBurgers = (burgers: Array<any>, addBurger: Function) => {
        for (const burger of burgers) {
            const article = document.createElement('article');
            const image = document.createElement('img');
            const titleName = document.createElement('h3');
            const info = document.createElement('ul');
            const buttonCart = document.createElement('button');   

            for (const ingredient of burger.ingredients) {
                const {name, gluten, vegetarian} = ingredient;
                const listName = document.createElement('li');
                const listGluten = document.createElement('li');
                const listVegetarian = document.createElement('li');
                const lSmall = document.createElement('label');
                const iSmall = document.createElement('input');
                const lMedium = document.createElement('label');         
                const iMedium = document.createElement('input');
                const lLarge = document.createElement('label');
                const iLarge = document.createElement('input');


                listName.innerHTML = `Ingrediente: ${name}`;
                listGluten.innerHTML = `Gluten: ${gluten}`;
                listVegetarian.innerHTML = `Vegetariana: ${vegetarian}`;

                lSmall.innerHTML = "Small";
                iSmall.setAttribute('type', 'radio');
                iSmall.setAttribute('name', 'sizes');
                iSmall.setAttribute('value', 'small');
                lMedium.innerHTML = "Medium";
                iMedium.setAttribute('type', 'radio');
                iMedium.setAttribute('name', 'sizes');
                iMedium.setAttribute('value', 'medium');
                lLarge.innerHTML = "Large";
                iLarge.setAttribute('type', 'radio');
                iLarge.setAttribute('name', 'sizes');
                iLarge.setAttribute('value', 'large');
                

                info.appendChild(listName);
                info.appendChild(listGluten);
                info.appendChild(listVegetarian);
                info.appendChild(lSmall);
                info.appendChild(iSmall);
                info.appendChild(lMedium);
                info.appendChild(iMedium);
                info.appendChild(lLarge);
                info.appendChild(iLarge);
            }

            image.setAttribute("src", burger.photo);
            titleName.innerHTML = burger.name;


            buttonCart.setAttribute("class", "material-symbols-outlined");
            buttonCart.innerHTML = "shopping_cart_checkout";

            buttonCart.addEventListener('click', () => {
                addBurger(burger)
                
            })

            article.appendChild(image);
            article.appendChild(titleName);
            article.appendChild(info);
            article.appendChild(buttonCart);

            this.elements.main.appendChild(article);
        }
    }

    private showDrinks = (drinks: Array<any>, addDrink: Function) => {
        for (const drink of drinks) {
            const article = document.createElement('article');
            const image = document.createElement('img');
            const titleName = document.createElement('h3');
            const info = document.createElement('ul');
            const listPrice = document.createElement('li');
            const listSugar = document.createElement('li');
            const buttonCart = document.createElement('button');


            image.setAttribute("src", drink.photo);
            titleName.innerHTML = drink.name;
            listPrice.innerHTML = `Precio: ${drink.price}€`;
            listSugar.innerHTML = `Azúcar: ${drink.sugar}`;

            buttonCart.setAttribute("class", "material-symbols-outlined");
            buttonCart.innerHTML = "shopping_cart_checkout";

            buttonCart.addEventListener('click', () => {
                addDrink(drink)
            })

            
            article.appendChild(image);
            article.appendChild(titleName);
            info.appendChild(listPrice);
            info.appendChild(listSugar);
            article.appendChild(info);
            article.appendChild(buttonCart);

            this.elements.main.appendChild(article);

        }
    }
}