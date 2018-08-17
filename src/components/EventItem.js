import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventItem extends Component {
  render() {
    return <Link to={this.props.id}>{this.props.title}</Link>;
  }
}

export default EventItem;
