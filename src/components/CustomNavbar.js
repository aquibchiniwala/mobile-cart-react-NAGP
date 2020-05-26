import React, { useContext, useEffect, useState } from 'react'
import { Navbar, Form, Nav, FormControl, Button, NavDropdown, Dropdown } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { connect } from 'react-redux'
import { fetchProducts } from '../helpers/api_calls';
import { sortMethodEnum } from '../enums';
import UserContext from '../contextAPI/UserContext';
import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";
import { sortProducts, filterProducts } from '../redux/actions';



function CustomNavbar({ sortMethod, sort, search, filterString, totalCartQty }) {
  const { user, setUser } = useContext(UserContext);
  const userName = localStorage.getItem("userName");
  const history = useHistory();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to={"/"}><Navbar.Brand> MobiKart.in</Navbar.Brand></Link>
      <Form inline onSubmit={e => { e.preventDefault(); }} style={{ width: "40%" }}>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: "100%" }} value={filterString} onChange={
          event => search(event.target.value)
        } />
        {/* <Button variant="outline-info">Search</Button> */}
      </Form>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          {
            sortMethod == sortMethodEnum.HIGH_TO_LOW ? <Nav.Link href="#" onClick={() => { sort(sortMethodEnum.LOW_TO_HIGH) }}>Sort by Price Low to High</Nav.Link> : <Nav.Link href="#" onClick={() => { sort(sortMethodEnum.HIGH_TO_LOW) }}>Sort by Price High to Low</Nav.Link>
          }
          {/* {
            userName ? <Nav.Link to={"/"}>Welcome {userName}</Nav.Link> : <p></p>
          } */}

          {
            userName ?
              <NavDropdown title={userName} id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
              : <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
          }
          <Nav.Link as={Link} to={"/cart"}><FaShoppingCart style={{ color: "red", fontSize: "30px" }} />{totalCartQty}</Nav.Link>


        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
  function logout() {
    const newUser = { name: "null", loggedIn: false };
    setUser(newUser);
    localStorage.removeItem("userName");
    history.push('/login');
  }
}

const mapStateToProps = (state) => ({ sortMethod: state.sortMethod, filterString: state.filterString, totalCartQty: state.totalCartQty })

const mapDispatchToProps = dispatch => ({
  sort: (sortMethod) => dispatch(sortProducts(sortMethod)),
  search: (filterString) => dispatch(filterProducts(filterString))
});


CustomNavbar = connect(mapStateToProps, mapDispatchToProps)(CustomNavbar)
export default CustomNavbar;