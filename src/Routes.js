import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {TripSingle, UserProfileTrips, Login, SearchAPI, TripPlanning} from './Components'


export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user" component={UserProfileTrips} />
        <Route exact path="/plantrip" component={TripPlanning} />
        <Route path="/trip/:tripId" component={TripSingle} />
        <Route path='/login' component={Login} />
        {/* Testing Routes */}
        <Route path="/triposoAPI" component={SearchAPI} />
      </Switch>
    );
  }
}

export default Routes;
