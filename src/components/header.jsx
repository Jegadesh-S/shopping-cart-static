import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import GloablSearchBox from "./globalSearch";
import { useSelector } from "react-redux";

function Header({ className }) {
  const cartCount = useSelector((store) => store.cart.cartItems.length);
  return (
    <>
      <Row
        className={`align-items-center ${className} `}
        xs={1}
        data-testid="header"
      >
        <Col className="logo-container" sm={1}>
          <img
            src="./../src/assets/EE.png"
            width="40px"
            alt="Equal Expert shopping cart"
          />
        </Col>
        <Col className="global-search-container" sm="10">
          <GloablSearchBox></GloablSearchBox>
        </Col>
        <Col className="menus-nav-container" sm="1">
          {/* <NavLink to="/products">Products</NavLink> */}
          <NavLink aria-disabled={cartCount == 0 ? true : false} to="/cart">
            <div className="d-flex">
              <img src="../src/assets/cart-icon.svg"></img>({cartCount})
            </div>
          </NavLink>
        </Col>
      </Row>
    </>
  );
}

export default Header;
