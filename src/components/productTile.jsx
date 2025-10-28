import { Card } from "react-bootstrap";

function ProductTileCard({ id, productImage, description, title, children }) {
  return (
    <>
      <Card
        data-testid="product-tile-card"
        id={`product-tile-card-${id}`}
        style={{ width: "18rem" }}
      >
        <Card.Img
          variant="top"
          src={productImage}
          width={285}
          height={180}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>{children}</Card.Footer>
      </Card>
    </>
  );
}

export default ProductTileCard;
