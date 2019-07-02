import React from 'react';
import './App.css';
import Routes from './Routes';
import NavigationBar from './Components/NavigationBar';


function App() {
  return (
    <div className="App">
      {/* <h1>Trekk</h1> */}
      <NavigationBar />
      <Routes />
    </div>
  );
}

export default App;
