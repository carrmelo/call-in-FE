import React from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarEvents.css'

const propTypes = {};

const localizer = BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Selectable extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      events: [
        {
          id: 0,
          title: "All Day Event very long title",
          allDay: true,
          start: new Date(2018, 0, 18),
          end: new Date(2018, 0, 18)
        }
      ]
    };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      });
  };

  render() {
    return (
      <div className="calendar__container">
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}

Selectable.propTypes = propTypes;

export default Selectable;
