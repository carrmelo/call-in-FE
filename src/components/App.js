import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Create from "./Create";
import EventsList from "./EventsList";
import EventDetail from "./EventDetail";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/:eventId" component={EventDetail} />
          <EventsList />
          <Create />
        </div>
      </Router>
    );
  }
}

export default App;
