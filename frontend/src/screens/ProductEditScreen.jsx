import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetail, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {

    const { id } = useParams();
    const [name ,setName] = useState('');
    const [price ,setPrice] = useState(0);
    const [image ,setImage] = useState('');
    const [brand ,setBrand] = useState('');
    const [category ,setCategory] = useState('');
    const [countInStock ,setCountInStock] = useState(0);
    const [description ,setDescription] = useState('');
    const [uploading ,setUploading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetail);
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate



    useEffect(() =>{

            if(successUpdate)
            {
              dispatch({type: PRODUCT_UPDATE_RESET})
              navigate('/admin/productlist')
            }
            else
            {
            if(!product.name || product._id !== id){
                dispatch(listProductDetail(id))
             } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }

            }



      
   
    },[dispatch, navigate, id, product, successUpdate])
  
    const uploadFileHandlar = async (e) =>{
      const file = e.target.files[0]
      const formData = new FormData() 
      formData.append('image',file) 
      console.log(formData);
      setUploading(true)
 
      try {
        const config = { 
          headers: {
             'Content-Type': 'multipart/from-data'
          }
      }
      const { data } = await axios.post('/api/upload', formData, config)
      console.log(data);
      setImage(data)
      setUploading(false);
      } catch (error) {
        console.error(error); 
        setUploading(false);
      }
    }
    const submitHandlar = (e) =>{
       e.preventDefault();  
       // UPDATE PRODUCT
       dispatch(updateProduct({
        _id : id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
      }
       ))
    }

  return (
    
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
    
    <FormContainer>  
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (
            <Form onSubmit={submitHandlar}>
           <Form.Group controlId='name'>
           <Form.Label>Full Name</Form.Label>
           <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
           <Form.Label>Price</Form.Label>
           <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
           <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
           <Form.Control type='file' label='Choose File' custom onChange={uploadFileHandlar}></Form.Control>
           {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
           <Form.Control type='text' placeholder='Enter brand url' value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
           <Form.Control type='text' placeholder='Enter category url' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
           <Form.Control type='text' placeholder='Enter count In Stock url' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
           <Form.Control type='text' placeholder='Enter description url' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
          </Form.Group>

          <Button className='py-3' type='submit' variant='primary'>Update</Button>
        </Form>

        )}
        
    </FormContainer>
    </>
  ) 
}

export default ProductEditScreen