import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import moment from 'moment';

import './EventDetail.css';

class EventDetail extends Component {
  // componentDidMount() {
  //   const { eventId } = this.props.match.params;

  //   this.props.calendarStore.loadEvent(eventId);
  // }

  handleCloseButton = () => {
    this.props.history.push('/');
  };

  handleDeleteButton = () => {
    const { url } = this.props.match;
    const body = JSON.stringify({ id: this.state._id });

    fetch(`http://localhost:5000/events${url}`, {
      method: 'DELETE',
      body,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() => this.props.history.push('/'))
      .catch(error => console.error(error));
  };

  render() {

    const {
      _id,
      title,
      description,
      startTime,
      endTime
    } = this.props.location.state;

    const momentStartTime = moment(startTime).format('DD-MM-YYYY HH:mm');
    const momentEndTime = moment(endTime).format('DD-MM-YYYY HH:mm');
    const momentReferencialStartTime =
      startTime < Date.now
        ? moment(startTime).fromNow()
        : moment(endTime).toNow();

    return (
      <div className="event_detail__container">
        <button
          className="event_detail__close"
          onClick={this.handleCloseButton}
        >
          <span role="image" aria-labelledby="close">
            ✖️
          </span>
        </button>
        <div className="event_detail_text__container">
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{momentReferencialStartTime}</p>
          <p>from {momentStartTime}</p>
          <p>until {momentEndTime}</p>
        </div>
        <div className="event_detail_buttons__container">
          <Link
            to={{
              pathname: `/edit/${_id}`,
              state: {
                _id,
                title,
                description,
                startTime,
                endTime
              }
            }}
          >
            <button>
              <span role="image" aria-labelledby="edit">
                ✏️
              </span>
            </button>
          </Link>
          <button onClick={this.handleDeleteButton}>
            <span role="image" aria-labelledby="delete">
              🗑
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default EventDetail;
