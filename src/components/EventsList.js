// @flow

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import EventItem from './EventItem';

import './EventList.css';
import { toCorrectDate } from '../helpers/correctDateTime';

type Props = {
  calendarStore: {
    events: Array<{
      id: number,
      title: string,
      description: string,
      startTime: string,
      endTime: string,
      allDay: boolean
    }>,
    loadEvents: any // <<<<<<<<<<<<research<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  }
}

@inject('calendarStore')
@observer
export default class EventsList extends Component<Props> {
  componentDidMount() {
    this.props.calendarStore.loadEvents();
  }

  renderPendingEventItem() {
    const { events } = this.props.calendarStore;
    const nextEvents = events.slice().filter(event => {
      const filterPending = toCorrectDate(new Date(Date.now()));
      return event.endTime > filterPending;
    });
    return nextEvents.length ? (
      nextEvents
        .sort((a, b) => {
          const c = new Date(a.startTime);
          const d = new Date(b.startTime);
          return c.getTime() - d.getTime(); // hot fix after array.sort() stopped working in a large array of dates
        })
        .map(event => <EventItem key={event.id} event={event} />)
    ) : (
      <div>You are free!</div>
    );
  }

  render() {
    return (
      <div>
        <h1>Next Events:</h1>
        <div className="event_list__container">
          {this.renderPendingEventItem()}
          <Link to={'/editor'}>
            <button>+</button>
          </Link>
        </div>
      </div>
    );
  }
}
