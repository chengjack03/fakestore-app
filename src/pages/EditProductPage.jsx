import { useEffect, useState} from "react";
import axios from "axios";
import { Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
const API_URL = "https://fakestoreapi.com/products";

function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/${id}`);
        const product = response.data;
        setTitle(product.title);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
        const payload = {
            title,
            price: parseFloat(price),
            description,
            category,
            image: 'https://via.placeholder.com/300' // Placeholder image
        };

        const response = await axios.put(`${API_URL}/${id}`, payload);
      setSuccessMessage('Product updated successfully!');
    } catch (err) {
      setErrorMessage('Failed to update product');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
        return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" />
        </div>
        );
    }

    if (errorMessage && !successMessage && !saving) {
        return <Alert variant="danger">{errorMessage}</Alert>;
    }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Edit Product</Card.Title>

        {successMessage && (<Alert variant="success" className="mt-3">{successMessage}</Alert>)}
        {errorMessage && (<Alert variant="danger" className="mt-3">{errorMessage}</Alert>)}
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
          </Form.Group>

            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
            </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}export default EditProductPage;