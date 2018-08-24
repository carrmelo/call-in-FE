import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Agenda.css';
import { observer, inject } from 'mobx-react';

const propTypes = {};

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

@inject('calendarStore', 'eventStore')
@withRouter
@observer
class Agenda extends React.Component {
  handleSelect = e => {
    this.props.eventStore.loadStartAndEndTime(e.start, e.end);
    this.props.history.push('/create');
  };

  handleSelectEvent = ({ id }) => {
    this.props.history.push(`/${id}`);
  };

  render() {
    return (
      <div className="agenda__container">
        <BigCalendar
          selectable
          localizer={localizer}
          toolbar={false}
          startAccessor={event => new Date(event.startTime)}
          endAccessor={event => new Date(event.endTime)}
          events={this.props.calendarStore.events}
          defaultView={BigCalendar.Views.AGENDA}
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

Agenda.propTypes = propTypes;

export default Agenda;
