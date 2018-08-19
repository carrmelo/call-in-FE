import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './EventDetail.css';

@inject('calendarStore', 'eventStore')
@observer
class EventDetail extends Component {

  componentWillMount() {
    const { eventId } = this.props.match.params;
    this.props.eventStore.set_id(eventId)
  }

  componentDidMount() {
    console.log(this.props);

    const { eventId } = this.props.match.params;
    this.props.eventStore.loadEvent(eventId);
  }

  componentDidUpdate(prevProps) {
    const { eventId } = this.props.match.params;
    console.log('sigo aqui');
    
    if (eventId !== prevProps.match.params.eventId) {
      this.props.eventStore.set_id(eventId);
      this.props.eventStore.loadEvent(eventId);
    }
  }

  handleCloseButton = () => {
    this.props.history.push('/');
  };

  handleDeleteButton = () => {
    const { eventId } = this.props.match.params;
    this.props.calendarStore.deleteEvent(eventId);
    this.handleCloseButton();
  };

  render() {
    const { eventId } = this.props.match.params;
    const {
      title,
      description,
      startTime,
      endTime
    } = this.props.eventStore;

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
          <span role="img" aria-labelledby="close">
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
              pathname: `/edit/${eventId}`,
              state: {
                _id: eventId,
                title,
                description,
                startTime,
                endTime
              }
            }}
          >
            <button>
              <span role="img" aria-labelledby="edit">
                ✏️
              </span>
            </button>
          </Link>
          <button onClick={this.handleDeleteButton}>
            <span role="img" aria-labelledby="delete">
              🗑
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default EventDetail;
