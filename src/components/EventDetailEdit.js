import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./EventDetailEdit.css";

class EventDetailEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props.location.state._id,
      title: this.props.location.state.title,
      description: this.props.location.state.description,
      startTime: this.props.location.state.startTime,
      endTime: this.props.location.state.endTime
    };
  }

  handleCloseButton = () => {
    this.props.history.push("/");
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      console.log(this.props); //Here you can fetch the props which you have passed
    }
  }

  handleEventEdit = () => {
    const { _id } = this.state;
    const body = JSON.stringify({ ...this.state });

    console.log(_id);
    

    fetch(`http://localhost:5000/events/${_id}`, {
      method: "PUT",
      body,
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => this.props.history.push("/"))
      .catch(error => console.error(error));
  };

  render() {
    const { _id, title, description, startTime, endTime } = this.state;

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
            type="text"
            placeholder={title}
            onChange={this.handleInputChange}
          />
          <input
            name="description"
            type="text"
            placeholder={description}
            onChange={this.handleInputChange}
          />
          <input
            name="startTime"
            type="datetime-local"
            value={startTime.substring(0, 16)}
            onChange={this.handleInputChange}
          />
          <input
            name="endTime"
            type="datetime-local"
            value={endTime.substring(0, 16)}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="event_detail_buttons__container">
          <Link to={`/${_id}`}>
            <button>
              <span role="img" aria-labelledby="delete">
                ❌️
              </span>
            </button>
          </Link>
          <button onClick={this.handleEventEdit}>
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
