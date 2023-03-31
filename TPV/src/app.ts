import { TpvController } from "./controller/tpv.controller";
import { ProductService } from "./service/product.service";
import { CartService } from "./service/cart-layout.service";
import { CartView } from "./view/cart-layout.view";
import { ProductView } from "./view/product.view";

const productView: ProductView = new ProductView();
const cartLayoutView: CartView = new CartView();
const productService: ProductService = new ProductService();
const cartLayoutService: CartService = new CartService();

new TpvController(productService, cartLayoutService, productView, cartLayoutView);