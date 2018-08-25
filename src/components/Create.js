import React, { Component } from 'react';
import '../style/Create.css';
import { inject, observer } from 'mobx-react';

@inject('eventStore')
@observer
class Create extends Component {
  handleChangeTitle = e => this.props.eventStore.setTitle(e.target.value);
  handleChangeDescription = e =>
    this.props.eventStore.setDescription(e.target.value);
  handleChangeStartTime = e =>
    this.props.eventStore.setStartTime(e.target.value);
  handleChangeEndTime = e => this.props.eventStore.setEndTime(e.target.value);

  handleSubmit = e => {
    e.preventDefault();
    this.props.eventStore.submitEvent();
    this.handleCloseButton();
  };

  handleCloseButton = () => {
    this.props.history.push('/');
    this.props.eventStore.resetEvent();
  };

  render() {
    const { title, description, startTime, endTime } = this.props.eventStore;
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
        />
        <label>Description:</label>
        <input
          name="description"
          value={description}
          type="text"
          placeholder="Description"
          onChange={this.handleChangeDescription}
        />
        <label>Start:</label>
        <div>
          <input
            name="startTime"
            value={startTime}
            type="datetime-local"
            onChange={this.handleChangeStartTime}
          />
          <input type="checkbox" name="allDay" value="allDay" />
          <label>Todo el día</label>
        </div>
        <label>End:</label>
        <input
          name="endTime"
          value={endTime}
          type="datetime-local"
          onChange={this.handleChangeEndTime}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default Create;
