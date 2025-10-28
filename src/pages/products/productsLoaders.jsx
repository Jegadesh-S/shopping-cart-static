import { getAllProducts } from "@services/products";

const fetchAllProdcuts = () => {
  return { productsPromise: getAllProducts() };
};

export default fetchAllProdcuts;
