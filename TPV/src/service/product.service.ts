export class ProductService {

  constructor() {}

  loadProducts = async () => {
    const response = fetch("../assets/mock/products.json");
    const data = await (await response).json();
    console.log(data[0]);
    return data[0];
  };
}
