import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Create from "./Create";
import EventsList from "./EventsList";
import EventDetail from "./EventDetail";
import EventDetailEdit from "./EventDetailEdit";
import CalendarEvents from './CalendarEvents';


import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/:eventId" component={EventDetail} />
          <Route path="/edit/:eventId" component={EventDetailEdit} />
          <EventsList />
          <Create />
          {/* <CalendarEvents /> */}
        </div>
      </Router>
    );
  }
}

export default App;
