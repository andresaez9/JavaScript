import { IElements } from "../core/interfaces/elements.interface"
import { Product } from "../service/cart-layout.service";

export class CartView {

    private elements: IElements = {
        header: document.querySelector('#header'),
        main: document.querySelector('#container'),
        cart: document.querySelector('#cart'),
        footer: document.querySelector('#footer')
    }
    
    renderCart = (myCart: Array<Product>) => {
        const tbody = document.querySelector('#cartProducts');
        
        tbody.innerHTML = "";

        for (const product of myCart) {
            const row = document.createElement('tr');
            const columnProduct = document.createElement('td');
            const columnSize = document.createElement('td');
            const columnPrice = document.createElement('td');
            const columnVAT = document.createElement('td');
            const columnQuantity = document.createElement('td');
            const columnSubTotal = document.createElement('td');
            const radioActive = document.querySelector('input[name="sizes"]:checked').value;

            columnProduct.innerHTML = product.name;
            columnSize.innerHTML = radioActive;
            columnPrice.innerHTML = product.price.toFixed(2);
            columnVAT.innerHTML = product.iva.toFixed();
            columnQuantity.innerHTML = "";
            columnSubTotal.innerHTML = produc
            row.appendChild(columnProduct);
            row.appendChild(columnSize);
            row.appendChild(columnPrice);
            row.appendChild(columnVAT);
            tbody.appendChild(row);
        }
    }
}