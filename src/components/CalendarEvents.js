// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarEvents.css';

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

@inject('calendarStore', 'eventStore')
@withRouter
@observer
export default class CalendarEvents extends Component {
  componentDidMount() {
    this.props.calendarStore.loadEvents();
  }

  handleSelect = ({ start, end }) => {
    this.props.eventStore.loadStartAndEndTime(start, end);
    this.props.history.push('/editor');
  };

  handleSelectEvent = ({ id }) => {
    this.props.history.push(`/${id}`);
  };

  render() {
    return (
      <div className="calendar__container">
        <BigCalendar
          selectable
          localizer={localizer}
          startAccessor={event => new Date(event.startTime)}
          endAccessor={event => new Date(event.endTime)}
          events={this.props.calendarStore.events}
          defaultView={BigCalendar.Views.MONTH}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(Date.now())}
          onSelectEvent={this.handleSelectEvent}
          onSelectSlot={this.handleSelect}
          step={15}
        />
      </div>
    );
  }
}
