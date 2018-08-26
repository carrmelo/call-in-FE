import React, { Component } from 'react';
import { inject, observer, PropTypes as mobxPropTypes } from 'mobx-react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import EventItem from './EventItem';


import './EventList.css';

@inject('calendarStore')
@observer
export default class EventsList extends Component {
  static propTypes = {
    events: mobxPropTypes.observableArray,
    loadEvents: PropTypes.func
  };

  componentDidMount() {
    this.props.calendarStore.loadEvents();
  }

  renderEventItem() {
    const events = this.props.calendarStore.events;
    
    return events.length ? (
      events
        .slice()
        .sort((a, b) => {
          const c = new Date(a.startTime)
          const d = new Date(b.startTime)
          return c.getTime() - d.getTime() // hot fix after array.sort() stopped working in a large array of dates
        })
        .map(event => {
          console.log(event.startTime);

          return <EventItem key={event.id} event={event} />;
        })
    ) : (
      <div>You are free!</div>
    );
  }

  render() {
    return (
      <div className="event_list__container">
        {this.renderEventItem()}
        <Link to={'create'}>
          <button>+</button>
        </Link>
      </div>
    );
  }
}
