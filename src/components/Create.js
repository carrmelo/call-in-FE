import React, { Component } from "react";
import "./Create.css";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      startTime: null,
      endTime: null
    };
  }

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleClick = e => {
    e.preventDefault();
    const body = JSON.stringify(this.state);
    this.setState = {
      title: "",
      description: "",
      startTime: null,
      endTime: null
    };
    fetch("http://localhost:3000/events", {
      method: "POST",
      body,
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  render() {
    
    return (
      <form className="create_form_container">
        <label>Title:</label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          onChange={this.handleInputChange}
        />
        <label>Description:</label>
        <input
          name="description"
          type="text"
          placeholder="Description"
          onChange={this.handleInputChange}
        />
        <label>Start:</label>
        <div>
          <input
            name="startTime"
            type="datetime-local"
            onChange={this.handleInputChange}
          />
          <input type="checkbox" name="allDay" value="allDay" />
          <label>Todo el día</label>
        </div>
        <label>End:</label>
        <input
          name="endTime"
          type="datetime-local"
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleClick}>Submit</button>
      </form>
    );
  }
}

export default Create;
