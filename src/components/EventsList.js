import React, { Component } from "react";
import EventItem from './EventItem'

class EventsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/events")
      .then(response => response.json())
      .then(data => this.setState({ events: data }))
      .catch(error => console.error(error));
  }

  renderEventItem() {
    const { events } = this.state;
    return events.length ? (
      events.map(event => <EventItem key={event._id} id={event._id} title={event.title} />)
    ) : (
      <div>¡Estas libre!</div>
    );
  }

  render() {
    return <div>{this.renderEventItem()}</div>;
  }
}

export default EventsList;
