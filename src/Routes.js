import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import {TripSingle, UserProfile, Login, SearchAPI, TripPlanning, TripSearch, Signup} from './Components'


=======
import {
  TripSingle,
  UserProfileTrips,
  Login,
  SearchAPI,
  TripPlanning,
  TripSearch,
  Signup,
} from './Components';
>>>>>>> master

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
      </Switch>
    );
  }
}

export default Routes;
