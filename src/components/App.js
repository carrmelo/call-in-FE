import React, { Component } from 'react';
import Create from './Create'
import CalendarEvents from './CalendarEvents';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalendarEvents />
        <Create />
      </div>
    );
  }
}

export default App;
