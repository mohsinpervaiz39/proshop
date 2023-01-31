import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders  } from '../actions/orderActions'

const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    console.log(orders);

  {/* const userDelete = useSelector(state => state.userDelete)
const { success:successDelete} = userDelete; */}
    
    useEffect(() => {
       if(userInfo && userInfo.isAdmin){
            dispatch(listOrders());
        } else {
            navigate('/login');
        }
       
    },[dispatch, navigate, userInfo])

  return (
    <>
    <h1>Orders</h1>
    
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (
        <Table striped bordered hover responsive className='table-sm'>
        <thead>
           <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
           </tr>
        </thead>
        <tbody>
          {
            orders.map((order) =>(
           <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.user && order.user.name}</td>
            <td>{order.user &&  (<a href={`mailto:${order.user.email}`}>{order.user.email}</a>)}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>$ {order.totalPrice}</td>
            <td>{order.isPaid ? 'PAID' : 'NOT PAID'}</td>
            <td>{order.isDelivered ? 'DELIVERED' : 'NOT DELIVERED'}</td>
            <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>Details</Button>
                </LinkContainer>
               
            </td>

           </tr>

          ))}
        </tbody>
        </Table>
    )}
    </>
  )
}

export default OrderListScreen