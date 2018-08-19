import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarEvents.css';
import { observer, inject } from 'mobx-react';

const propTypes = {};

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

@inject('calendarStore')
@withRouter
@observer
class Selectable extends React.Component {
  handleSelect = hola => {
    console.log(hola);
  };

  handleSelectEvent = hola => {
    console.log(hola._id);
    
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="calendar__container">
        <BigCalendar
          selectable
          localizer={localizer}
          startAccessor='startTime'
          endAccessor='endTime'
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
