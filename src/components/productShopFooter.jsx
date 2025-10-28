import { Button, Col, Row } from "react-bootstrap";
import Ratings from "./ratings";

function ProductShopFooter({ id, rating, customerCount, addToCart, price }) {
  return (
    <div data-testid="product-to-cart" id={`product-to-cart-${id}`}>
      <Row>
        <Col>
          <div className="rating-section d-flex" title={rating}>
            <Ratings rating={rating} customerCount={customerCount}></Ratings>
          </div>
        </Col>
      </Row>
      <Row className="gap-2">
        <Col>
          <Button
            data-testid={`btn-product-to-cart-${id}`}
            variant="warning"
            size="sm"
            onClick={addToCart}
          >
            Add To Cart
          </Button>
        </Col>
        <Col className="text-end">
          {" "}
          <strong>&#8377; {price.toFixed(2)}</strong>
        </Col>
      </Row>
    </div>
  );
}

export default ProductShopFooter;
