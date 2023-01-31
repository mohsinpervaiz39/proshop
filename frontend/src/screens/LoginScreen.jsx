import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userAction.js'

const LoginScreen = () => {
   const location = useLocation();
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() =>{
      if(userInfo){
       console.log(redirect); 
       if(redirect === '/'){
        navigate('/');
       } else {
        console.log('in else now');
        navigate(`/${redirect}`);
       }
      
      }
    },[navigate, userInfo, redirect])

    const submitHandlar = (e) =>{
       e.preventDefault(); 
       dispatch(login(email, password))
    
    }

  return (
    <FormContainer>  
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandlar}>
          <Form.Group controlId='email'>
           <Form.Label>Email Address</Form.Label>
           <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
           <Form.Label>Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button className='py-3' type='submit' variant='primary'> Sign In</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect? `/register?redirect=${redirect}`: '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen