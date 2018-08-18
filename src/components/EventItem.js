import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventItem extends Component {
  render() {
    return (
      <Link to={this.props.id}>
        <button>{this.props.title}</button>
      </Link>
    );
  }
}

export default EventItem;
