import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class CalendarEvents extends Component {
  render() {
    return (
      <div>
        <BigCalendar 
          startAccessor='startDate'
          endAccessor='endDate'/>
      </div>
    );
  }
}

export default CalendarEvents;
