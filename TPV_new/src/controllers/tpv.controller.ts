//import { Product } from "../core/types/product.type";
import { ProductDetail } from "../core/interfaces/product-detail.interface";
import { TpvService } from "../services/tpv.service";
import { TpvView } from "../views/tpv.view";

export class TpvController {
    constructor(
        private readonly tpvService: TpvService,
        private readonly tpvView: TpvView
    ){
        this.tpvService = tpvService;
        this.tpvView = tpvView;

        this.init();
    }

    init = () => {
        this.tpvView.renderProducts(this.handlerLoadProducts(), this.handlerAddProduct);
        this.loadShoppingCart();
    }
    
    private handlerLoadProducts = async () => {
        return await this.tpvService.loadProducts();
    }

    private handlerAddProduct = (product: ProductDetail) => {    
        this.tpvService.addProduct(product);
        this.loadShoppingCart();
    }

    private loadShoppingCart = () => {
        this.tpvView.renderShoppingCartProducts(this.tpvService.products);
    }
}