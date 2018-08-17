import React, { Component } from "react";

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
      .then(data => {
        console.log(data);
        
        this.setState({ events: data })
      })
      .catch(error => console.error(error));
  }

  render() {
    return <div>hola</div>;
  }
}

export default EventsList;
