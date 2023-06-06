import { burgerTemplate, drinkTemplate } from "../core/components/cards.component";
import { footer } from "../core/components/footer.component";
import { header } from "../core/components/header.component";
import { renderShoppingCartProducts } from "../core/components/shopping-cart.component";
import { ProductDetail } from "../core/interfaces/product-detail.interface";
//import { Elements } from "../core/interfaces/elements.interfaces";

export class TpvView {
        private header = document.querySelector('#header')!;
        private cardsContainer = document.querySelector('#containerCards')!;
        private shoppingCart = document.querySelector('#shoppingCart')!;
        private shoppingCartProducts = document.querySelector('#shoppingCartProducts')!;
        private footer = document.querySelector('#footer')!;

    constructor(){
        this.renderNavbar();
        this.renderFooter();
    }

    renderProducts = async (products: Promise<any>, addProduct: Function) => {
        const {burgers, drinks} = await products;
        
        this.showBurgers(burgers, addProduct);
        //this.showDrinks(drinks, addProduct);
    }

    renderShoppingCartProducts = (products: Array<any>) => {
        this.shoppingCartProducts.innerHTML += renderShoppingCartProducts(products);
    }

    private showBurgers = (burgers: Array<any>, callbackAddBurger: Function) => {
        for (const burger of burgers){  
            this.cardsContainer.innerHTML += burgerTemplate(burger);
        }

        for (const burger of burgers) {
            const btnAddBurger = document.querySelector(`#btnAddBurger-${burger.id}`)! as HTMLButtonElement;

            btnAddBurger.onclick = () => {
                callbackAddBurger(burger);
            }
        }
    }

    private showDrinks = (drinks: Array<any>, callbackAddDrink: Function) => {
        for (const drink of drinks){            
            this.cardsContainer.innerHTML += drinkTemplate(drink);
        }

        for (const drink of drinks) {
            const btnAddDrink = document.querySelector(`#btnAddDrink-${drink.id}`)! as HTMLButtonElement;
            
            btnAddDrink.onclick = () => {
                callbackAddDrink(drink);
            }
        }
    }

    private renderNavbar = () => {
        this.header.innerHTML = header;
    }

    private renderFooter = () => {
        this.footer.innerHTML = footer;
    }
}