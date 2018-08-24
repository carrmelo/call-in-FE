import { observable, action } from 'mobx';

import calendarStore from './calendarStore';

class EventStore {
  @observable isLoading = false;

  @observable id = '';
  @observable title = '';
  @observable description = '';
  @observable startTime = '';
  @observable endTime = '';

  getEvent(event_id) {
    const event = calendarStore.events.filter(event => event.id === event_id);
    if (event.length) {      
      this.id = event[0].id;
      this.title = event[0].title;
      this.description = event[0].description;
      this.startTime = event[0].startTime;
      this.endTime = event[0].endTime;
    }
  }

  @action
  set_id(event_id) {
    if (this.id !== event_id) {
      this.resetEvent();
      this.id = event_id;
    }
  }

  @action loadInitialData() {
    if (!this.id) return this.resetEvent();
    else return this.loadEvent(this.id);
  }

  @action loadStartAndEndTime(start, end) {    
    this.startTime = start.toISOString().substring(0, 16);
    this.endTime = end.toISOString().substring(0, 16);
  }

  @action
  loadEvent(id) {
    const event = this.getEvent(id);
    if (!event) {
      this.isLoading = true;
      fetch(`http://localhost:3000/api/v1/events/${id}`)
        .then(response => response.json())
        .then(
          action(data => {
            console.log('now', data);
            
            this.id = data.id;
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
    this.id = '';
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
    console.log(this.startTime);
    console.log(this.endTime);
    console.log(new Date(this.startTime));
    console.log(new Date(this.endTime));
    
    this.isLoading = true;
    const event = {
      title: this.title,
      description: this.description,
      startTime: new Date(this.startTime),
      endTime: new Date(this.endTime),
      allDay: false
    }

    console.log('yo', event);
    
    return (this.id
      ? calendarStore.updateEvent(event, this.id)
      : calendarStore.createEvent(event)
    )
  }
}

export default new EventStore();
