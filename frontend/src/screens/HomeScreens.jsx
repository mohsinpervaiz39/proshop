import React, { useEffect} from 'react'
import { Helmet } from "react-helmet";
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate';
import { Container, Row, Col } from 'react-bootstrap'
import { listProduct } from '../actions/productActions.js'
import ProductCarsoual from '../components/ProductCarsoual';


const HomeScreens = () => {

const { keyword, pageNumber } = useParams();

const dispatch = useDispatch();

const productList = useSelector(state => state.productList);
const { loading, error, products, page, pages } = productList 


   useEffect(()=>{
    dispatch(listProduct(keyword, pageNumber))
   },[dispatch, keyword, pageNumber]);

  return (
    <>   
        <Helmet>
            <meta charSet="utf-8" /> 
            <title>Welcome to ProShop</title>
            <meta name='description' content='We sell all the best products'/>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {!keyword ? <ProductCarsoual/>: ''}
        <h1>Latest Products</h1>
        {loading ? 
        <Loader/> : 
        error ? <Message variant='danger'>{error}</Message> : (
          <>
        <Row>
            {products.map(product => (
                 <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                 </Col>
            ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
        )}

    </>
  )
}

export default HomeScreens 