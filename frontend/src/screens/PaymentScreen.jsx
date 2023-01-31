import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cardActions'

const PaymentScreen = () => {


    const cart = useSelector(state =>state.cart)
    const { shippingAddress } = cart


    const dispatch = useDispatch();
    const navigate = useNavigate();  

    
    if(!shippingAddress){
        navigate('/shipping');
    }
  
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
  
    const submitHandlar = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
    <FormContainer> 
      <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandlar}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
          
          <Col>
            <Form.Check type="radio" label="Paypal or Credit Card" id="Paypal" name="paymentMethod" Value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
          <Col>
          <Form.Check type="radio" label="Stripe" id="Stripe" name="paymentMethod" Value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
         </Form.Group>
          <Button type="submit" className='my-3' variant='primary'>Continue</Button>
        </Form>
        
    </FormContainer>
  )
}

export default PaymentScreen
