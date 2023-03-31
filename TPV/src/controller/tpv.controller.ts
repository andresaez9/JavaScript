import { Size } from "../core/enum/size.enum";
import { CartService } from "../service/cart-layout.service";
import { ProductService } from "../service/product.service";
import { CartView } from "../view/cart-layout.view";
import { ProductView } from "../view/product.view";


export class TpvController {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly productView: ProductView,
    private readonly cartView: CartView
) {
    this.productService = productService;
    this.cartService = cartService;
    this.productView = productView;
    this.cartView = cartView;

    this.init();
}

  init = () => {
    this.productView.renderProducts(this.handlerLoadProducts(), this.handlerAddProduct);
    this.loadCart();
  };

  handlerLoadProducts = async () => {
    return await this.productService.loadProducts();
  }

  handlerAddProduct = (product, size: Size) => {
    this.cartService.addProduct(product, size);
    this.loadCart();
  }

  loadCart = () => {
    this.cartView.renderCart(this.cartService.myCart);
    console.log(this.cartService.myCart);
    
  }
}
