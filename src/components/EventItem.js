// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './EventItem.css';

type Props = {
  event: {
    id: number,
    title: string,
    description: string,
    startTime: string,
    endTime: string
  }
};

function EventItem(props: Props) {
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
      <p className="item_date">
        from {moment(event.startTime).format('DD-MM-YYYY')}
        <br />
        to {moment(event.endTime).format('DD-MM-YYYY')}
      </p>
    </Link>
  );
}

export default EventItem;
