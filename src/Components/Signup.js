//using hooks and firebase auth

import React, { useState, useEffect } from "react";
import { Form, Button, Input } from "react-bootstrap";
import firebase from 'firebase/app';
import auth from '../firebase';
//import db from "../firebase";

export const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

// useEffect(() => console.log("state", [name]))

  return (
    <div>
      <Form>
      <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter email" value={name} onChange={e => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="button" onClick={onSignUp}>
          Submit
        </Button>
      </Form>
    </div>
  );

function onSignUp(){

      console.log("email", email)
      console.log("password", password)

      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        console.log(user)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage)
      })

      //db.collection("Users").add();

			//props.history.replace('/')

  }

};

export default Signup;
