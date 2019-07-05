import React, { useState, useContext } from 'react';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import userContext from '../Contexts/userContext';
import firebase from 'firebase/app';

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
    <Navbar bg="dark" variant="dark" sticky="top" style={{ height: '8vh' }}>
      <Navbar.Brand>Trekk</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/user">
          <Nav.Link>My Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/plantrip">
          <Nav.Link>Plan Trekk</Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav>
        <NavDropdown drop="left" title="Account" id="nav-dropdown-left"
        key="left">
          <NavDropdown.Item>
            Welcome {loggedInUser.displayName}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <Button
              variant="info"
              // style={{ textAlign: 'center', width: '100%' }}
              onClick={handleClick}
            >
              Logout
            </Button>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
