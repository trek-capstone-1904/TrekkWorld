import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  UserProfile,
  Login,
  SearchAPI,
  TripPlanning,
  TripSearch,
  WorldMap,
  CreateTrekkForm,
  TripPage,
  Journal,
  CountrySelect
} from "./Components";
import { PhotoLoad } from "./Components/Helper/PhotoLoad";
import { Welcome } from "./Components/Welcome/Welcome";

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/trip/:tripId/journal" component={Journal} />
        <Route path="/trip/:tripId" component={TripPage} />
        <Route exact path="/profile" component={UserProfile} />
        <Route path="/profile/:userId" component={UserProfile} />
        <Route exact path="/plantrip" component={TripPlanning} />
        <Route path="/login" component={Login} />
        {/* Testing Routes */}
        <Route path="/triposoAPI" component={SearchAPI} />
        <Route exact path="/tripSearch" component={TripSearch} />
        <Route exact path="/addPhoto" component={PhotoLoad} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/countries" component={CountrySelect} />
        <Redirect from="/" to="/profile" />
      </Switch>
    );
  }
}

export default Routes;
