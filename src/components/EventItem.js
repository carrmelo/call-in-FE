import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Link
        to={{
          pathname: event._id,
          state: {
            _id: event._id,
            title: event.title,
            description: event.description,
            startTime: event.startTime,
            endTime: event.endTime
          }
        }}
      >
        <button>{event.title}</button>
      </Link>
    );
  }
}

export default EventItem;
