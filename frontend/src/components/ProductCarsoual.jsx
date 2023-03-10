import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProduct } from '../actions/productActions' 
import { useDispatch, useSelector } from 'react-redux'

const ProductCarsoual = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const{ loading, error, products } = productTopRated

     console.log(products);
     console.log(error);

    useEffect(() =>{
        dispatch(listTopProduct())
    }, [dispatch])

  return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
    <div>
    <Carousel pause="hover" className='bg-dark'>
    {products.map(product => (
        <Carousel.Item key={product._id}>
         <Link to={`/product/${product._id}`}>
         <Image src={product.image} alt={product.name} fluid />
         <Carousel.Caption className='carousel-caption'>
          <h2>{product.name} ({product.price})</h2>
          </Carousel.Caption>
         </Link>
      
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
  )
}
 
export default ProductCarsoual