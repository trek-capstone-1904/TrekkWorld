//using hooks and firebase auth

import React, { useState, useEffect } from "react";
import { Form, Button, Input } from "react-bootstrap";
import firebase from 'firebase/app'
import 'firebase/auth'
import db from "../firebase";

export const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

useEffect(() => console.log("state", [email]))

  return (
    <div>
      <Form>
      <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}/>
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
        <Button variant="primary" type="submit" onClick={onSignUp}>
          Submit
        </Button>
      </Form>
    </div>
  );

  async function onSignUp(){
    try{
      console.log(useState)
      await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })

      //db.collection("Users").add();

			//props.history.replace('/')
    } catch (error){
      alert(error.message)
    }
  }

};

export default Signup;
