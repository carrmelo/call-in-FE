import React, { Component } from 'react';
import "./Create.css"

class Create extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value, 'IIIIIII', name);
    
    this.setState({
      [name]: value
    });
  }

  handleClick = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <form className="create_form_container">
        <label>Title:
          <input
            name="title"
            type="text"
            placeholder="Title"
            onChange={this.handleInputChange} />
        </label>
        <label>Description:
          <input
            name="description"
            type="text"
            placeholder="Description"
            onChange={this.handleInputChange} />
        </label>
        <label>Start:
          <input
            name="startDate"
            type="date"
            onChange={this.handleInputChange} />
          <input
            name="startTime"
            type="time"
            onChange={this.handleInputChange} />
        </label>
        <label>End:
          <input
            name="endDate"
            type="date"
            onChange={this.handleInputChange} />
          <input
            name="endTime"
            type="time"
            onChange={this.handleInputChange} />
        </label>
        <button onClick={this.handleClick}>Submit</button>
      </form>
    )
  }
};

export default Create;