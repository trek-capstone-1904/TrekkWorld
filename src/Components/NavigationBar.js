import React, { useState, useContext } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
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
          <Nav.Link>User Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Log In</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/plantrip">
          <Nav.Link>Plan Trip</Nav.Link>
        </LinkContainer>
        {(loggedInUser &&
          <Button onClick={handleClick}>Logout</Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
