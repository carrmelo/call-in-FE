import React, { Component } from 'react';

class EventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      title: '',
      description: '',
      startTime: null,
      endTime: null
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/events${id}`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <p>{this.props.startTime}</p>
        <p>{this.props.endTime}</p>
      </div>
    )
  }
}

export default EventDetail;