import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import UserProfile from './Components/UserProfile';
import TripSingle from './Components/TripSingle';
import UserProfileTrips from './Components/UserProfileTrips';
import Login from './Components/Login';

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user" component={UserProfileTrips} />
        <Route path="/trip/:tripId" component={TripSingle} />
        <Route path='/login' component={Login} />
      </Switch>
    );
  }
}

export default Routes;
