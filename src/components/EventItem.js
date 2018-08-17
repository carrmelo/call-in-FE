import React, { Component } from "react";

class EventItem extends Component {
  render() {
    return <div>{this.props.title}</div>;
  }
}

export default EventItem;
