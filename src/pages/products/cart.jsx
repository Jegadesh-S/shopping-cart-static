import useCart from "@customHooks/useCart";
import { Button, Form } from "react-bootstrap";
import ProductTileCard from "@components/productTile";
import ProductCartFooter from "@components/productCartFooter";

function CartItems() {
  const {
    cartItems,
    allProductSelectedStatus,
    navigateTo,
    onUpdatingCartItemQuantity,
    onRemovingItemFromCart,
    onDeselectingAllProductsFromCart,
    onSelectingAllProductsToCart,
    onSelectingProductToCart,
    totalProductsSum,
  } = useCart();

  return (
    <>
      {cartItems.length > 0 && (
        <>
          <h5>Shopping Cart</h5>
          <div className="shopping-cart-total-section d-flex justify-content-end">
            {!allProductSelectedStatus && (
              <>
                <a
                  data-testid="select-all-products"
                  onClick={onSelectingAllProductsToCart}
                  href="#"
                >
                  Select all items
                </a>
              </>
            )}
            {allProductSelectedStatus && cartItems.length > 0 && (
              <a
                data-testid="deselect-all-products"
                onClick={onDeselectingAllProductsFromCart}
                href="#"
              >
                Deselect all items
              </a>
            )}
            <strong>Total Amount: &#8377; {totalProductsSum.toFixed(2)}</strong>{" "}
            <Button
              data-testid="proceed-to-pay"
              variant="success"
              disabled={totalProductsSum <= 0}
            >
              Proceed to pay
            </Button>
            {/* </div>{" "} */}
          </div>
        </>
      )}

      {!cartItems.length && (
        <>
          <div className="empty-cart-section d-flex align-items-center justify-content-center">
            <div className="p-5">
              {" "}
              <h3 data-testid="cart-is-empty-section">Your cart is Empty.</h3>
              <Button
                data-testid="navigate-to-product"
                variant="outline-info"
                onClick={() => navigateTo("/products")}
              >
                Navigate to Product page
              </Button>
            </div>
          </div>
        </>
      )}
      <div className="cart-list-container d-flex">
        {cartItems.map((product, key) => (
          <>
            {" "}
            <Form.Check
              isValid
              checked={product.isSelectedForCart}
              onChange={(e) =>
                onSelectingProductToCart(e.target.checked, product.id)
              }
            ></Form.Check>
            <ProductTileCard
              id={product.id}
              productImage={product.image}
              description={product.description}
              title={product.title}
              isSelectedForCart={product.isSelectedForCart}
            >
              <ProductCartFooter
                id={product.id}
                rating={product.rating.rate}
                customerCount={product.rating.count}
                price={product.price}
                productCount={product.productCount}
                onUpdatingCartItemQuantity={onUpdatingCartItemQuantity}
                onRemovingItemFromCart={onRemovingItemFromCart}
              ></ProductCartFooter>
            </ProductTileCard>
          </>
        ))}
      </div>
    </>
  );
}

export default CartItems;
