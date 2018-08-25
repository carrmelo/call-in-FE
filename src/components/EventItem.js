import React from 'react';
import { Link } from 'react-router-dom';

const EventItem = props => {
  const { event } = props;
  return (
    <Link
      to={{
        pathname: event.id,
        state: {
          id: event.id,
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
};

export default EventItem;