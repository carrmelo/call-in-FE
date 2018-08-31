import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import EventEdit from './EventEdit';
import EventsList from './EventsList';
import EventDetail from './EventDetail';
import CalendarEvents from './CalendarEvents';

import './App.css';

@observer
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <DevTools />
          <Switch>
            <Route exact path="/editor" component={EventEdit} />
            <Route exact path="/:eventId" component={EventDetail} />
          </Switch>
          <EventsList />
          <CalendarEvents />
        </div>
      </Router>
    );
  }
}
