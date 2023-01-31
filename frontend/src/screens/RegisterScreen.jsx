import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction.js'

const RegisterScreen = ({ location, history }) => {
     
    const [name ,setName] = useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [confirmpassword ,setConfirmPassword] = useState('');
    const [message ,setMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const {loading, error, userInfo} = userRegister

    const redirect = location?.search ? location.search.split('=')[1] : '/'

    useEffect(() =>{
      if(userInfo){
        navigate(redirect);
      }
    },[history, userInfo, redirect])

    const submitHandlar = (e) =>{
       e.preventDefault(); 
       if(password !== confirmpassword){
        setMessage('Passwords do not match');
       } else {
         // DISPATCH REGISTERED
        dispatch(register(name, email, password))
       }
    }

  return (
    <FormContainer>  
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandlar}>
           <Form.Group controlId='name'>
           <Form.Label>Full Name</Form.Label>
           <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
           <Form.Label>Email Address</Form.Label>
           <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
           <Form.Label>Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button className='py-3' type='submit' variant='primary'> Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Have an Account? <Link to={redirect? `/login?redirect=${redirect}`: '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen