import { Col, Row, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import { Provider } from "react-redux";
import eeShoppingCartStore from "../app/mainLayoutStore";

function MainLayout() {
  return (
    <>
      <Provider store={eeShoppingCartStore}>
        <Container className="main-layout-container">
          <Row className="sticky-top bg-white shadow-sm">
            <Col>
              <Header className="header-container"></Header>
            </Col>
          </Row>
          <Row className="dynamic-content" data-testid="dynamic-content">
            <Col>
              <Outlet></Outlet>
            </Col>
          </Row>
        </Container>
      </Provider>
    </>
  );
}

export default MainLayout;
