import React, { Component } from 'react';
import Create from './Create'
import MyCalendar from './MyCalendar'
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyCalendar />
        <Create />
      </div>
    );
  }
}

export default App;
