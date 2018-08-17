import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Create from './Create'
import EventsList from './EventsList'
import EventDetail from './EventDetail'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router className="App">
        <Switch>
          <Route path="/:eventId" component={EventDetail} />
          <EventsList />
          <Create />
        </Switch>
      </Router>
    );
  }
}

export default App;
