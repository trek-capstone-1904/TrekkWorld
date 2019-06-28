import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import UserProfile from './Components/UserProfile';
import TripSingle from './Components/TripSingle';

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user/" component={UserProfile} />
        <Route path="/trip/:tripId" component={TripSingle} />
      </Switch>
    );
  }
}

export default Routes;
