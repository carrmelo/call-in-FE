import React, { Component } from "react";
import moment from "moment";

import "./EventDetail.css";

class EventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: "",
      title: "",
      description: "",
      startTime: null,
      endTime: null
    };
  }

  componentDidMount() {
    const { url } = this.props.match;

    fetch(`http://localhost:3000/events${url}`)
      .then(response => response.json())
      .then(data => this.setState({ ...data }))
      .catch(error => console.error(error));
  }

  handleCloseButton = () => {
    this.props.history.push("/");
  };

  handleDeleteButton = () => {
    const { url } = this.props.match;
    const body = JSON.stringify({ id: this.state._id });

    fetch(`http://localhost:3000/events${url}`, {
      method: "DELETE",
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
    const { title, description, startTime, endTime } = this.state;

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
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{momentReferencialStartTime}</p>
          <p>from {momentStartTime}</p>
          <p>until {momentEndTime}</p>
        </div>
        <div className="event_detail_buttons__container">
          <button>
            <span role="image" aria-labelledby="edit">
              ✏️
            </span>
          </button>
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
