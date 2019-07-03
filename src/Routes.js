import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  TripSingle,
  UserProfile,
  Login,
  SearchAPI,
  TripPlanning,
  TripSearch,
  Signup,
  WorldMap,
} from './Components';
import {PhotoLoad} from './Components/PhotoLoad'

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user" component={UserProfile} />
        <Route exact path="/plantrip" component={TripPlanning} />
        <Route path="/trip/:tripId" component={TripSingle} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* Testing Routes */}
        <Route path="/triposoAPI" component={SearchAPI} />
        <Route exact path="/tripSearch" component={TripSearch} />
        <Route exact path="/addPhoto" component={PhotoLoad} />
      </Switch>
    );
  }
}

export default Routes;
