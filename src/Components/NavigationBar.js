import React, { useState, useContext } from 'react';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import userContext from "../Contexts/userContext";
import firebase from 'firebase/app'

export const NavigationBar = () => {
  let loggedInUser = useContext(userContext)

  const handleClick = e => {
    firebase.auth().signOut().then(function(){
      console.log("signout successful")
    }).catch(function(error){
      console.log(error)
    })
  }

  return (
    <Navbar bg="dark" variant="dark" sticky="top" style={{height:'8vh'}}>
      <Navbar.Brand>Trekk</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/user">
          <Nav.Link>My Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Log In</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/plantrip">
          <Nav.Link>Plan Trekk</Nav.Link>
        </LinkContainer>
        <NavDropdown title="Account">
        <NavDropdown.Item>
        Welcome {loggedInUser.displayName}
        </NavDropdown.Item>
        <NavDropdown.Item>
        </NavDropdown.Item>
        <Button align='right' onClick={handleClick}>Logout</Button>
        </NavDropdown>

      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
