import React, { Component } from "react";
import moment from "moment";

import "./EventDetail.css";

class EventDetailEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  // handleDeleteButton = () => {
  //   const { url } = this.props.match;
  //   const body = JSON.stringify({ id: this.state._id });

  //   fetch(`http://localhost:3000/events${url}`, {
  //     method: "DELETE",
  //     body,
  //     mode: "cors",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(() => this.props.history.push("/"))
  //     .catch(error => console.error(error));
  // };

  render() {
    const { title, description, startTime, endTime } = this.state;

    console.log(startTime, "2017-06-01T08:30");

    const momentStartTime = moment(startTime).format("DD-MM-YYYY at HH:mm");
    const momentEndTime = moment(endTime).format("DD-MM-YYYY at HH:mm");
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
            name="startTime"
            type="datetime-local"
            value={endTime.substring(0, 16)}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="event_detail_buttons__container">
          <button>
            <span role="image" aria-labelledby="edit">
              ✅
            </span>
          </button>
          <button onClick={this.handleDeleteButton}>
            <span role="image" aria-labelledby="delete">
              ❌️
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default EventDetailEdit;
