import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './EventDetailEdit.css';
import { inject, observer } from 'mobx-react';

@inject('eventStore')
@observer
class EventDetailEdit extends Component {
  handleChangeTitle = e => this.props.eventStore.setTitle(e.target.value);
  handleChangeDescription = e =>
    this.props.eventStore.setDescription(e.target.value);
  handleChangeStartTime = e =>
    this.props.eventStore.setStartTime(e.target.value);
  handleChangeEndTime = e => this.props.eventStore.setEndTime(e.target.value);


  handleSubmit = e => {
    e.preventDefault();
    this.props.eventStore.submitEvent();
    this.handleCloseButton()
  };

  handleCloseButton = () => {
    this.props.history.push('/');
  };

  render() {
    const { eventId } = this.props.match.params;
    const { title, description, startTime, endTime } = this.props.eventStore;
    console.log(eventId);
    
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
        <h1>Edit Event</h1>
        <div className="event_edit_input__container">
          <input
            name="title"
            value={title}
            type="text"
            placeholder={title}
            onChange={this.handleChangeTitle}
          />
          <input
            name="description"
            value={description}
            type="text"
            placeholder={description}
            onChange={this.handleChangeDescription}
          />
          <input
            name="startTime"
            value={startTime.substring(0, 16)}
            type="datetime-local"
            onChange={this.handleChangeStartTime}
          />
          <input
            name="endTime"
            value={endTime.substring(0, 16)}
            type="datetime-local"
            onChange={this.handleChangeEndTime}
          />
        </div>
        <div className="event_detail_buttons__container">
          <Link to={eventId ? `/${eventId}` : '/'}>
            <button>
              <span role="img" aria-labelledby="delete">
                ❌️
              </span>
            </button>
          </Link>
          <button onClick={this.handleSubmit}>
            <span role="img" aria-labelledby="edit">
              ✅
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default EventDetailEdit;
