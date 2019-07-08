import React, { useState, useContext } from 'react';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import userContext from '../Contexts/userContext';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
export const NavigationBar = () => {
  let loggedInUser = useContext(userContext);

  const handleClick = e => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log('signout successful');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      sticky="top"
      style={{ height: '8vh', justifyContent: 'space-between' }}
    >
      <Nav>
        <img src="https://firebasestorage.googleapis.com/v0/b/trekk-fdf31.appspot.com/o/website%2FiconTeal.png?alt=media&token=e04d9ccf-a0cc-4d6f-8f24-f51ecf1bc5b5" alt="travel icon" height="42" width="42"/>
        <Navbar.Brand>Trekk </Navbar.Brand>
        <p style={{margin:'auto', color:'#696969'}}>{loggedInUser.displayName}</p>
      </Nav>
      <Nav className="justify-content-end">
        <LinkContainer to="/profile">
          <Nav.Link>My Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/plantrip">
          <Nav.Link>Plan Trekk</Nav.Link>
        </LinkContainer>
        {/* <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item>
          Welcome {loggedInUser.displayName}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item> */}
        <Nav.Link
          to="/"
          style={{ textDecoration: 'none' }}
          onClick={handleClick}
        >
          Log Out
        </Nav.Link>
        {/* </NavDropdown.Item> */}
        {/* </NavDropdown> */}
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
