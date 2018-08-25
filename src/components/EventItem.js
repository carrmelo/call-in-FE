import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import './EventItem.css'

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
      <p className="item_date">{moment(event.startTime).format('DD-MM-YYYY')}</p>
    </Link>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired
  })
};

export default EventItem;
