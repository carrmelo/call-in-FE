import React, { Component } from 'react';
import "./Create.css"

class Create extends Component {
  render() {
    return (
      <form className="create_form_container">
        <label>Title: </label>
        <input type="text" placeholder="Title" />
        <label>Description: </label>
        <input type="text" placeholder="Description" />
        <label>Start: </label>
        <input type="date" />
        <input type="time" />
        <label>End: </label>
        <input type="date" />
        <input type="time" />
      </form>
    )
  }
};

export default Create;