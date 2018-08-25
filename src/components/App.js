import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Create from './Create';
import EventsList from './EventsList';
import EventDetail from './EventDetail';
import EventDetailEdit from './EventDetailEdit';
import Selectable from './CalendarEvents';

import './App.css';

@observer
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <DevTools />
          <Switch>
            <Route exact path="/create" component={Create} />
            <Route exact path="/:eventId" component={EventDetail} />
            <Route exact path="/edit/:eventId" component={EventDetailEdit} />
          </Switch>
          <EventsList />
          <Selectable />
        </div>
      </Router>
    );
  }
}

export default App;
