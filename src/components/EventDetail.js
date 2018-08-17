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
    const { url } = this.props.match
    
    fetch(`http://localhost:3000/events${url}`)
      .then(response => response.json())
      .then(data => this.setState({ ...data }))
      .catch(error => console.error(error));
  }

  render() {
    console.log(this.state);
    
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <p>{this.state.startTime}</p>
        <p>{this.state.endTime}</p>
      </div>
    )
  }
}

export default EventDetail;