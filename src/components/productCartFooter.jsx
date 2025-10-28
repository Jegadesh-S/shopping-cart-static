import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import Ratings from "./ratings";
import {
  ADD_ITEM_TO_CART,
  REDUCE_ITEM_COUNT_TO_CART,
} from "../utils/constants";

function ProductCartFooter({
  id,
  rating,
  customerCount,
  productCount,
  price,
  onRemovingItemFromCart,
  onUpdatingCartItemQuantity,
}) {
  return (
    <div data-testid="product-to-buy" id={`product-to-buy-${id}`}>
      {" "}
      <Row>
        <Col>
          <div className="rating-section d-flex" title={rating}>
            <Ratings rating={rating} customerCount={customerCount}></Ratings>
          </div>
        </Col>
      </Row>
      <Row className="gap-2 align-items-center">
        <Col className="gap-2">
          <InputGroup size="sm" className="cart-item-count-container">
            {productCount == 1 && (
              <img
                data-testid={`product-to-remove-${id}`}
                src="../src/assets/trash.svg"
                width={"25px"}
                height={"25px"}
                onClick={() => onRemovingItemFromCart(id)}
              ></img>
            )}
            {productCount > 1 && (
              <img
                data-testid={`product-${1}-count-decrease`}
                src="../src/assets/minus-product.png"
                width={"15px"}
                height={"25px"}
                onClick={() =>
                  onUpdatingCartItemQuantity(id, REDUCE_ITEM_COUNT_TO_CART)
                }
              ></img>
            )}
            <FormControl disabled value={productCount}></FormControl>
            <img
              data-testid={`product-${1}-count-increase`}
              src="../src/assets/add-product.png"
              width={"25px"}
              height={"25px"}
              onClick={() => onUpdatingCartItemQuantity(id, ADD_ITEM_TO_CART)}
            ></img>
          </InputGroup>
        </Col>
        <Col className="text-end">
          {" "}
          <div data-testid={`product-${id}-total-price`}>
            <strong>&#8377; {(productCount * price).toFixed(2)}</strong>{" "}
          </div>
          <div data-testid={`product-price-${id}`}>
            <small> &#8377; {price.toFixed(2)} (each)</small>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductCartFooter;
