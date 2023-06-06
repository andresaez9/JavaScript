import { ProductDetail } from "../interfaces/product-detail.interface";

export const renderShoppingCartProducts = (productsDetails: ProductDetail[]) => {
    let initValue: string = "";
    
    for (const productDetail of productsDetails) {
        const {product, quantity} = productDetail
        const {id, name, price, vat} = product;

        const priceWithVat = calculatePriceVAT(price, vat);

        initValue = `
            <tr>
                <td>${quantity}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${price}</td>
                <td>${vat}</td>
                <td>${priceWithVat}</td>
            </tr>
    `;
    }
    return initValue;    
}

const calculatePriceVAT = (price: number, vat: number) => {
    return price + vat;
}