import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateItemToCart,
  removeItemFromCart,
  updateAllProductsSelectedStatusFromCart,
  updateSelectedProductStatusToCart,
} from "../app/cartSlice";

function useCart() {
  const { cartItems, allProductSelectedStatus } = useSelector(
    (store) => store.cart
  );

  const totalProductsSum = cartItems.reduce((acc, current) => {
    if (current.isSelectedForCart) {
      acc += current.price * current.productCount;
    }
    return acc;
  }, 0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateTo = (target) => {
    navigate("/products");
  };

  const onUpdatingCartItemQuantity = (id, operation) => {
    dispatch(
      updateItemToCart({
        thisItem: cartItems.find((p) => p.id == id),
        operation,
      })
    );
  };

  const onRemovingItemFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const onDeselectingAllProductsFromCart = () => {
    dispatch(updateAllProductsSelectedStatusFromCart(false));
  };

  const onSelectingAllProductsToCart = () => {
    dispatch(updateAllProductsSelectedStatusFromCart(true));
  };

  const onSelectingProductToCart = (isChecked, id) => {
    dispatch(updateSelectedProductStatusToCart({ id, isChecked }));
  };

  return {
    cartItems,
    allProductSelectedStatus,
    navigateTo,
    onUpdatingCartItemQuantity,
    onRemovingItemFromCart,
    onDeselectingAllProductsFromCart,
    onSelectingAllProductsToCart,
    onSelectingProductToCart,
    onSelectingProductToCart,
    totalProductsSum,
  };
}

export default useCart;
