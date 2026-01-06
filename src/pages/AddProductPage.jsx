import { useState } from "react";
import axios from "axios";
import {Form , Button, Alert, Card} from 'react-bootstrap'

const API_URL = 'https://fakestoreapi.com/products'

function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
        const payload = {
            title,
            price: parseFloat(price),
            description,
            category,
            image: 'https://via.placeholder.com/300' // Placeholder image
        }
        const response = await axios.post(API_URL, payload)
        setSuccessMessage('Product added successfully!')
        setTitle('')
        setPrice('')
        setDescription('')
        setCategory('')
    }   catch (err) {
        setErrorMessage('Failed to add product. Please try again.')
    } finally {
        setLoading(false)
    }
    }  

    return (
    <Card>
      <Card.Body>
        <Card.Title>Add Product</Card.Title>

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
            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
            </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddProductPage;