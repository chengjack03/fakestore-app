import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Welcome to FakeStore E-Commerce</Card.Title>
        <Card.Text>
          Browse products, view details, and simulate adding, editing, and
          deleting items using FakeStoreAPI.
        </Card.Text>
        <Button variant="primary" onClick={() => navigate("/products")}>
          Go to Products
        </Button>
      </Card.Body>
    </Card>
  );
}

export default HomePage;
