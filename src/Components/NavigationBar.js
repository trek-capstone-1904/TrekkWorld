import React, { useState, useContext } from 'react';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import userContext from '../Contexts/userContext';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { TripSelectNav } from './index';
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
        <img
          src="https://firebasestorage.googleapis.com/v0/b/trekk-fdf31.appspot.com/o/website%2FiconTeal.png?alt=media&token=e04d9ccf-a0cc-4d6f-8f24-f51ecf1bc5b5"
          alt="travel icon"
          height="42"
          width="42"
        />
        <Navbar.Brand>Trekk </Navbar.Brand>
        <p style={{ margin: 'auto', color: 'teal' }}>
          {loggedInUser.displayName}
        </p>
      </Nav>
      <Nav className="justify-content-end">
        {/* <LinkContainer to="/profile">
          <Nav.Link>
            <TripSelectNav />
          </Nav.Link>
        </LinkContainer> */}
        <TripSelectNav />
        <LinkContainer to="/profile">
          <Nav.Link>My Profile</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/plantrip">
          <Nav.Link>Plan Trekk</Nav.Link>
        </LinkContainer>
        <Nav.Link
          to="/"
          style={{ textDecoration: 'none' }}
          onClick={handleClick}
        >
          Log Out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
