import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
    <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
    </Link>
    <Card.Body>
        <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
        <Card.Text as='div'>
            <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product