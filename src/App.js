import React from 'react';
import logo from './logo.svg';
import './App.css';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

require('./secrets');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  // apiKey: process.env.APIKEY,
  // authDomain: process.env.AUTHDOMAIN,
  projectId: 'trekk-fdf31',
});

// console.log(${process.env.AUTHDOMAIN})

var db = firebase.firestore();

// db.collection('Users')
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       console.log(`${doc.id} => ${doc.data()}`);
//       console.log(doc.data())
//     });
//   });

async function users() {
  let usersAll= await db.collection('Users').get();
  console.log(usersAll.docs)
  console.log(typeof usersAll.docs)
  // console.log(usersAll.docs.get('trips'))
  db.collection('Users').get().then((user)=>{
    user.docs.forEach(doc=>{
      console.log(doc.data().name)
      console.log(doc.get('friends'))
    })
  });
  // console.log('current Data', doc.data);
  // console.log(usersAll);
}

users();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
