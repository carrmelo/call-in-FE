import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import {
  formErrorHandler,
  formRequiredFieldHandler,
  formDatesHander
} from '../helpers/formErrorHandler';
import './EventDetailEdit.css';

@inject('eventStore')
@observer
export default class EventDetailEdit extends Component {
  state = {
    touched: {
      title: false,
      startTime: false,
      endTime: false
    }
  };

  handleBlur = field => e => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleChangeTitle = e => this.props.eventStore.setTitle(e.target.value);

  handleChangeDescription = e => this.props.eventStore.setDescription(e.target.value);

  handleChangeStartTime = e => this.props.eventStore.setStartTime(e.target.value);

  handleChangeEndTime = e => this.props.eventStore.setEndTime(e.target.value);

  toggleLocalAllDay = () => {
    this.props.eventStore.toggleAllDay();
    const { allDay, startTime } = this.props.eventStore;
    if (allDay) this.props.eventStore.setEndTime(startTime);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.eventStore.submitEvent();
    this.handleCloseButton();
  };

  handleCloseButton = () => {
    this.props.history.push('/');
    this.props.eventStore.resetEvent();
  };

  handleFieldErrorMessage = (inputProperty, field) => {
    return (
      this.state.touched[inputProperty] &&
      formRequiredFieldHandler(field) && (
        <p className="required">This field is required</p>
      )
    );
  };

  handleDatesErrorMessage = (startTime, endTime) => {
    return (
      (this.state.touched['startTime'] || this.state.touched['endTime']) &&
      formDatesHander(startTime, endTime) && (
        <p className="required">
          End date and time should be after start date and time
        </p>
      )
    );
  };

  renderAllDay = () => {
    const { startTime } = this.props.eventStore;
    let { allDay } = this.props.eventStore;
    return (
      startTime && (
        <div>
          <input
            type="checkbox"
            name="allDay"
            value="allDay"
            checked={allDay}
            onChange={this.toggleLocalAllDay}
          />
          <label>All day</label>
        </div>
      )
    );
  };

  render() {
    const { eventId } = this.props.match.params;
    const {
      title,
      description,
      startTime,
      endTime,
      allDay
    } = this.props.eventStore;

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
            onBlur={this.handleBlur('title')}
          />
          {this.handleFieldErrorMessage('title', title)}
          <input
            name="description"
            value={description}
            type="text"
            placeholder={description}
            onChange={this.handleChangeDescription}
          />
          <div className="allDay">
            <input
              name="startTime"
              value={startTime.substring(0, 16)}
              type="datetime-local"
              onChange={this.handleChangeStartTime}
              onBlur={this.handleBlur('startTime')}
            />
            {this.renderAllDay()}
          </div>
          {this.handleFieldErrorMessage('startTime', startTime)}
          <input
            name="endTime"
            value={endTime.substring(0, 16)}
            type="datetime-local"
            onChange={this.handleChangeEndTime}
            onBlur={this.handleBlur('endTime')}
            disabled={allDay}
          />
          {this.handleFieldErrorMessage('endTime', endTime)}
          {this.handleDatesErrorMessage(startTime, endTime)}
        </div>
        <div className="event_detail_buttons__container">
          <Link to={eventId ? `/${eventId}` : '/'}>
            <button>
              <span role="img" aria-labelledby="delete">
                ❌️
              </span>
            </button>
          </Link>
          <button
            onClick={this.handleSubmit}
            disabled={formErrorHandler(
              formRequiredFieldHandler(title),
              formDatesHander(startTime, endTime),
              formRequiredFieldHandler(startTime),
              formRequiredFieldHandler(endTime)
            )}
          >
            <span role="img" aria-labelledby="edit">
              ✅
            </span>
          </button>
        </div>
      </div>
    );
  }
}
