import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import {
  formErrorHandler,
  formRequiredFieldHandler,
  formDatesHander
} from '../helpers/formErrorHandler';
import './EventEdit.css';

@inject('eventStore')
@observer
export default class EventEdit extends Component {
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

  handleChange = e =>
    this.props.eventStore.setEventProperty(e.target.name, e.target.value);

  handleToggleAllDay = () => {
    this.props.eventStore.toggleAllDay();
    const { allDay, startTime } = this.props.eventStore;
    if (allDay) this.props.eventStore.setEventProperty('endTime', startTime);
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

  handleCancelButton = () => {
    this.props.history.push(`/${this.props.eventStore.id}`);
  };

  renderFieldErrorMessage = (inputProperty, field) => {
    return (
      this.state.touched[inputProperty] &&
      formRequiredFieldHandler(field) && (
        <p className="required">This field is required</p>
      )
    );
  };

  renderDatesErrorMessage = (startTime, endTime) => {
    return (
      formDatesHander(startTime, endTime) &&
      this.state.touched['endTime'] && (
        <p className="required">
          End date and time should be later than start date and time
        </p>
      )
    );
  };

  renderCancelButton = () => {
    return (
      this.props.eventStore.id && (
        <button onClick={this.handleCancelButton}>Cancel</button>
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
            onChange={this.handleToggleAllDay}
          />
          <label>All day</label>
        </div>
      )
    );
  };

  render() {
    const {
      id,
      title,
      description,
      startTime,
      endTime
    } = this.props.eventStore;
    let { allDay } = this.props.eventStore;

    return (
      <form className="create_form_container">
        <button className="create__close" onClick={this.handleCloseButton}>
          <span role="img" aria-labelledby="close">
            ✖️
          </span>
        </button>
        <h1>{id ? 'Update Event' : 'Create Event'}</h1>
        <label>Title:</label>
        <input
          name="title"
          value={title}
          type="text"
          placeholder={id ? title : 'Title'}
          onChange={this.handleChange}
          onBlur={this.handleBlur('title')}
        />
        {this.renderFieldErrorMessage('title', title)}
        <label>Description:</label>
        <input
          name="description"
          value={description}
          type="text"
          placeholder={id ? description : 'Description'}
          onChange={this.handleChange}
        />
        <label>Start:</label>
        <div className="allDay">
          <input
            name="startTime"
            value={startTime.substring(0, 16)}
            type="datetime-local"
            onChange={this.handleChange}
            onBlur={this.handleBlur('startTime')}
          />
          {this.renderAllDay()}
        </div>
        {this.renderFieldErrorMessage('startTime', startTime)}
        <label>End:</label>
        <input
          name="endTime"
          value={endTime.substring(0, 16)}
          type="datetime-local"
          onChange={this.handleChange}
          onBlur={this.handleBlur('endTime')}
          disabled={allDay}
        />
        {this.renderFieldErrorMessage('endTime', endTime)}
        {this.renderDatesErrorMessage(startTime, endTime)}
        <div className="button_container">
          {this.renderCancelButton()}
          <button
            onClick={this.handleSubmit}
            disabled={formErrorHandler(
              formRequiredFieldHandler(title),
              formDatesHander(startTime, endTime),
              formRequiredFieldHandler(startTime),
              formRequiredFieldHandler(endTime)
            )}
          >
            {id ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    );
  }
}
