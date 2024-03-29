import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import './EventDetail.css';

@inject('calendarStore', 'eventStore')
@observer
export default class EventDetail extends Component {
  componentWillMount() {
    const { eventId } = this.props.match.params;
    this.props.eventStore.set_id(eventId);
  }

  componentDidMount() {
    const { eventId } = this.props.match.params;
    this.props.eventStore.loadEvent(eventId);
  }

  componentDidUpdate(prevProps) {
    const { eventId } = this.props.match.params;
    if (eventId !== prevProps.match.params.eventId) {
      this.props.eventStore.set_id(eventId);
      this.props.eventStore.loadEvent(eventId);
    }
  }

  handleCloseButton = () => {
    this.props.history.push('/');
    this.props.eventStore.resetEvent();
  };

  handleEditButton = () => {
    this.props.history.push('/editor');
  };

  handleDeleteButton = () => {
    const { eventId } = this.props.match.params;
    this.props.calendarStore.deleteEvent(eventId);
    this.handleCloseButton();
  };

  render() {
    const { title, description, startTime, endTime } = this.props.eventStore;

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
          <button onClick={this.handleEditButton}>
            <span role="img" aria-labelledby="edit">
              ✏️
            </span>
          </button>
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
