import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
          <Route path="/:eventId" component={EventDetail} />
          <Route path="/edit/:eventId" component={EventDetailEdit} />
          <EventsList />
          <Create />
          <Selectable />
        </div>
      </Router>
    );
  }
}

export default App;
