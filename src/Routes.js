import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  TripSingle,
  UserProfileTrips,
  Login,
  SearchAPI,
  TripPlanning,
  TripSearch,
  Signup,
} from './Components';

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user" component={UserProfileTrips} />
        <Route exact path="/plantrip" component={TripPlanning} />
        <Route path="/trip/:tripId" component={TripSingle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* Testing Routes */}
        <Route path="/triposoAPI" component={SearchAPI} />
        <Route exact path="/tripSearch" component={TripSearch} />
      </Switch>
    );
  }
}

export default Routes;
