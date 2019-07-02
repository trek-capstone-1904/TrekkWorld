import React from 'react';
import './App.css';
import Routes from './Routes';
import NavigationBar from './Components/NavigationBar';
import { Route, Switch } from 'react-router-dom'
import Login from './Components/Login';
import userContext from './Contexts/userContext'
import ProviderWrapper from './Components/ProviderWrapper'

function App(props) {
  if(!props.user){
    return(
      <Switch>
        {/* TODO: add in a welcome page where a user can log in */}
        {/* <Route exact path='/Welcome' component={Welcome} */}
        <Route component={Login} />
      </Switch>
    )
  } else {
    return (
      <ProviderWrapper>
      <div className="App">
        {/* <h1>Trekk</h1> */}
        <NavigationBar />
        <Routes />
      </div>
      </ProviderWrapper>
    );

  }
}

export default App;
