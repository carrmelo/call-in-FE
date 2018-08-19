import { observable, action } from 'mobx';

import calendarStore from './calendarStore';

class EventStore {
  @observable isLoading = false;

  @observable _id = '';
  @observable title = '';
  @observable description = '';
  @observable startTime = '';
  @observable endTime = '';

  getEvent(event_id) {
    const event = calendarStore.events.filter(event => event._id === event_id);
    if (event.length) {      
      this._id = event[0]._id;
      this.title = event[0].title;
      this.description = event[0].description;
      this.startTime = event[0].startTime;
      this.endTime = event[0].endTime;
    }
  }

  @action
  loadEvent(id) {
    const event = this.getEvent(id);
    if (!event) {
      this.isLoading = true;
      fetch(`http://localhost:5000/events/${id}`)
        .then(response => response.json())
        .then(
          action(data => {
            this._id = data._id;
            this.title = data.title;
            this.description = data.description;
            this.startTime = data.startTime;
            this.endTime = data.endTime;
            this.isLoading = false;
          })
        )
        .catch(error => {
          this.isLoading = false;
          console.error(error);
        });
    } else return event;
  }

  @action
  set_id(event_id) {
    if (this._id !== event_id) {
      this.resetEvent();
      this._id = event_id;
    }
  }

  @action
  resetEvent() {
    this.title = '';
    this.description = '';
    this.startTime = null;
    this.endTime = null;
  }

  @action
  setTitle(title) {
    this.title = title;
  }

  @action
  setDescription(description) {
    this.description = description;
  }

  @action
  setStartTime(startTime) {
    this.startTime = startTime;
  }

  @action
  setEndTime(endTime) {
    this.endTime = endTime;
  }

  @action
  submitEvent() {
    this.isLoading = true;
    const event = {
      _id: this._id ? this._id : null,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime
    };
    return (this._id
      ? calendarStore.updateEvent(event)
      : calendarStore.createEvent(event)
    )
  }
}

export default new EventStore();
