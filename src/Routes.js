import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserProfile from './Components/UserProfile';

export class Routes extends Component {
  render() {
    return <Route path="/user/" component={UserProfile} />;
  }
}

export default Routes;
