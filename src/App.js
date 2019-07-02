import React from 'react';
import './App.css';
import Routes from './Routes';
import NavigationBar from './Components/NavigationBar';


function App(props) {
  if (!props.user) {
    return (
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route component={LogIn}/>
      </Switch>
    )
  }
  else {
    return (
      <userContext.Provider value={props.user}>
        // const user = useContext(userContext)
        <div className="App">
          {/* <h1>Trekk</h1> */}
          <NavigationBar />
          <Routes />
        </div>
      </userContext.Provider>
    );
  }
}


export default App;
