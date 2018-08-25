import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import {
  formErrorHandler,
  formRequiredFieldHandler,
  formDatesHander
} from '../helpers/formErrorHandler';
import './Create.css';

@inject('eventStore')
@observer
export default class Create extends Component {
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

  handleChangeDescription = e =>
    this.props.eventStore.setDescription(e.target.value);

  handleChangeStartTime = e =>
    this.props.eventStore.setStartTime(e.target.value);

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
    return this.state.touched[inputProperty] &&
      formRequiredFieldHandler(field) && (
      <p className="required">This field is required</p>
    );
  };

  handleDatesErrorMessage = (startTime, endTime) => {
    return formDatesHander(startTime, endTime) &&
      this.state.touched['endTime'] && (
      <p className="required">
        End date and time should be later then start date and time
      </p>
    );
  };

  renderAllDay = () => {
    const { startTime } = this.props.eventStore;
    let { allDay } = this.props.eventStore;
    return startTime && (
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
    );
  };

  render() {
    const { title, description, startTime, endTime } = this.props.eventStore;
    let { allDay } = this.props.eventStore;

    return (
      <form className="create_form_container">
        <button className="create__close" onClick={this.handleCloseButton}>
          <span role="img" aria-labelledby="close">
            ✖️
          </span>
        </button>
        <label>Title:</label>
        <input
          name="title"
          value={title}
          type="text"
          placeholder="Title"
          onChange={this.handleChangeTitle}
          onBlur={this.handleBlur('title')}
        />
        {this.handleFieldErrorMessage('title', title)}
        <label>Description:</label>
        <input
          name="description"
          value={description}
          type="text"
          placeholder="Description"
          onChange={this.handleChangeDescription}
        />
        <label>Start:</label>
        <div className="allDay">
          <input
            name="startTime"
            value={startTime}
            type="datetime-local"
            onChange={this.handleChangeStartTime}
            onBlur={this.handleBlur('startTime')}
          />
          {this.renderAllDay()}
        </div>
        {this.handleFieldErrorMessage('startTime', startTime)}
        <label>End:</label>
        <input
          name="endTime"
          value={endTime}
          type="datetime-local"
          onChange={this.handleChangeEndTime}
          onBlur={this.handleBlur('endTime')}
          disabled={allDay}
        />
        {this.handleFieldErrorMessage('endTime', endTime)}
        {this.handleDatesErrorMessage(startTime, endTime)}
        <button
          onClick={this.handleSubmit}
          disabled={formErrorHandler(
            formRequiredFieldHandler(title),
            formDatesHander(startTime, endTime),
            formRequiredFieldHandler(startTime),
            formRequiredFieldHandler(endTime)
          )}
        >
          Submit
        </button>
      </form>
    );
  }
}
