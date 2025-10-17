import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { setAllProducts } from "@app/productSlice";
import { updateItemToCart } from "@app/cartSlice";
import { ADD_ITEM_TO_CART } from "@utils/constants";

function useProducts() {
  const { productsPromise } = useLoaderData();

  const { allProducts, filteredProducts, isFiltered } = useSelector(
    (store) => store.products
  );

  const products = isFiltered ? filteredProducts : allProducts;

  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(
      updateItemToCart({
        thisItem: allProducts.find((p) => p.id == id),
        operation: ADD_ITEM_TO_CART,
      })
    );
  };

  useEffect(() => {
    if (isFiltered) return;
    if (productsPromise instanceof Promise) {
      productsPromise
        .then((res) => {
          dispatch(setAllProducts(res));
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
  }, []);

  return { productsPromise, products, addToCart };
}

export default useProducts;
