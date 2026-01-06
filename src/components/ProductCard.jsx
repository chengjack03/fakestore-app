import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ objectFit: "contain", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{product.title}</Card.Title>
        <Card.Text className="fw-bold">${product.price}</Card.Text>
        <Button
          as={Link}
          to={`/products/${product.id}`}
          variant="primary"
          className="mt-auto"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
