import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction.js'
import SearchBox from './SearchBox.jsx';

const Header = () => {

  const dispatch = useDispatch();
 const userLogin = useSelector(state => state.userLogin)

 const { userInfo } = userLogin; 

 const logoutHandlar = () =>{
  dispatch(logout())
 }

  return (
    <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
      <LinkContainer to='/'>
      <Navbar.Brand>Proshop</Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {/*<Router><Routes><Route render={() => <SearchBox/>}></Route></Routes></Router>*/}
        <SearchBox/>
          <Nav className="ms-auto">
          <LinkContainer to='/cart'><Nav.Link><i className='fas fa-shopping-cart px-1'></i>Cart</Nav.Link></LinkContainer>
          { userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandlar}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
          <LinkContainer to='/login'><Nav.Link><i className='fas fa-user px-1'></i>Sign In</Nav.Link></LinkContainer>          
          )}
          { userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
               
            </NavDropdown>
          )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header