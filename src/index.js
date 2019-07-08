import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import history from './history';
import firebase from 'firebase/app';

function renderApplication(user = null) {
  ReactDOM.render(
    <Router history={history}>
      <App user={user} />
    </Router>,
    document.getElementById('root')
  );
}

firebase.auth().onAuthStateChanged(function(user) {
  renderApplication(user);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
