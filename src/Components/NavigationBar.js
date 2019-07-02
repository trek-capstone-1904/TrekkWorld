import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const NavigationBar = () => {
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
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
