import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarEvents.css';
import { observer, inject } from 'mobx-react';
import events from '../stores/events';

const propTypes = {};

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

@withRouter
@observer
class Selectable extends Component {

  componentDidMount() {
    events.fetch()
    

    // if (events)
    
    // this.props.calendarStore.loadEvents();
  }

  handleSelect = e => {
    this.props.eventStore.loadStartAndEndTime(e.start, e.end);
    this.props.history.push('/create');
  };

  handleSelectEvent = ({ id }) => {
    this.props.history.push(`/${id}`);
  };

  render() {
    console.log(events.isRequest('fetching'));
    console.log(events.toJS());
    
    return (
      <div className="calendar__container">
        <BigCalendar
          selectable
          localizer={localizer}
          titleAccessor={event => event.attributes.title}
          startAccessor={event => new Date(event.attributes.startTime)}
          endAccessor={event => new Date(event.attributes.endTime)}
          events={events.toJS()}
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
