import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Trekk</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/user">
          <Nav.Link>User Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Log In</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
