import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Link to={event._id}>
        <button>{event.title}</button>
      </Link>
    );
  }
}

export default EventItem;
