import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import EventItem from './EventItem';

import './EventList.css';

@inject('calendarStore')
@observer
export default class EventsList extends Component {
  componentDidMount() {
    this.props.calendarStore.loadEvents();
  }

  renderEventItem() {
    const events = this.props.calendarStore.events;
    return events.length ? (
      events
        .slice()
        .sort((a, b) => a.startTime > b.startTime)
        .map(event => <EventItem key={event.id} event={event} />)
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
