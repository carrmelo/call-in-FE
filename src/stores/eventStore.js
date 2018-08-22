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
  set_id(event_id) {
    if (this._id !== event_id) {
      this.resetEvent();
      this._id = event_id;
    }
  }

  @action loadInitialData() {
    if (!this._id) return this.resetEvent();
    else return this.loadEvent(this.id);
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
  resetEvent() {
    this._id = '';
    this.title = '';
    this.description = '';
    this.startTime = '';
    this.endTime = '';
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
      title: this.title,
      description: this.description,
      startTime: new Date(this.startTime),
      endTime: new Date(this.endTime),
      allDay: false
    }
    return (this._id
      ? calendarStore.updateEvent(event, this._id)
      : calendarStore.createEvent(event)
    )
  }
}

export default new EventStore();
