import React, { Component } from 'react';
import Create from './Create'
import EventsList from './EventsList'
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <EventsList />
        <Create />
      </div>
    );
  }
}

export default App;
