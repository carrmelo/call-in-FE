// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarEvents.css';
import { observer, inject } from 'mobx-react';

const propTypes = {};

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

type Props = {
  calendarStore: {
    loadEvents: () => Array<{}>
  },
  eventStore: {
    loadStartAndEndTime: (string, string) => void
  },
  history: any
}

@inject('calendarStore', 'eventStore')
@withRouter
@observer
class Selectable extends Component<Props> {
  componentDidMount() {
    console.log(this.props.history);
    
    this.props.calendarStore.loadEvents();
  }

  handleSelect = e => {
    this.props.eventStore.loadStartAndEndTime(e.start, e.end);
    this.props.history.push('/create');
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

Selectable.propTypes = propTypes;

export default Selectable;
