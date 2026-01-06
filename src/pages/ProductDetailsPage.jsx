import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Spinner, Alert, Button, Modal, Card } from "react-bootstrap";

const API_URL = "https://fakestoreapi.com/products";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  async function handleDelete() {
    try {
      setDeleting(true);
      setDeleteError(null);
      await axios.delete(`${API_URL}/${id}`);
      // API says success but does not persist, which is expected....now i need to add delete success message
      setDeleteSuccess('Product deleted successfully!');
      navigate("/products");
    } catch (err) {
      setDeleteError("Failed to delete product. Please try again.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!product) {
    return <Alert variant="warning">Product not found.</Alert>;
  }

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Button as={Link} to="/products" variant="secondary">
            Back to Products
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={5} className="mb-3">
          <Card>
            <Card.Img
              src={product.image}
              alt={product.title}
              style={{ objectFit: "contain", height: "300px" }}
            />
          </Card>
        </Col>
        <Col md={7}>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success mb-3">${product.price}</h4>
          <p>{product.description}</p>

          <div className="d-flex gap-2 mt-3 flex-wrap">
            <Button variant="success">Add to Cart (optional)</Button>
            <Button
              as={Link}
              to={`/edit-product/${product.id}`}
              variant="warning"
            >
              Edit Product
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete Product
            </Button>
          </div>

        // Display delete success or error messages

          {deleteSuccess && (
            <Alert variant="success" className="mt-3">
              {deleteSuccess}
            </Alert>
          )}

          {deleteError && (
            <Alert variant="danger" className="mt-3">
              {deleteError}
            </Alert>
          )}
          <p className="mt-3 text-muted">
            Note: FakeStoreAPI will return a success response to DELETE, but the
            underlying data will not actually be removed.
          </p>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete &quot;{product.title}&quot;?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDetailsPage;
