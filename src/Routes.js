import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  TripSingle,
  UserProfile,
  Login,
  SearchAPI,
  TripPlanning,
  TripSearch,
  WorldMap,
  CreateTrekkForm,
} from './Components';
import { PhotoLoad } from './Components/Helper/PhotoLoad';
import { Welcome } from './Components/Welcome/Welcome';

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/user" component={UserProfile} />
        <Route exact path="/plantrip" component={TripPlanning} />
        <Route path="/trip/:tripId" component={TripSingle} />
        <Route path="/login" component={Login} />
        {/* Testing Routes */}
        <Route path="/triposoAPI" component={SearchAPI} />
        <Route exact path="/tripSearch" component={TripSearch} />
        <Route exact path="/addPhoto" component={PhotoLoad} />
        <Route exact path="/welcome" component={Welcome} />
      </Switch>
    );
  }
}

export default Routes;
