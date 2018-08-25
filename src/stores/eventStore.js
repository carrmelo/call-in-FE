import { observable, action } from 'mobx';

import calendarStore from './calendarStore';
import { apiFetch, apiError } from '../helpers/api';

class EventStore {
  @observable
  isLoading = false;

  @observable
  id = '';
  @observable
  title = '';
  @observable
  description = '';
  @observable
  startTime = '';
  @observable
  endTime = '';
  @observable
  allDay = false;

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

  @action
  loadInitialData() {
    if (!this.id) return this.resetEvent();
    else return this.loadEvent(this.id);
  }

  @action
  loadStartAndEndTime(start, end) {
    this.startTime = start.toISOString().substring(0, 16);
    this.endTime = end.toISOString().substring(0, 16);
  }

  @action
  loadEvent(id) {
    const event = this.getEvent(id);
    if (!event) {
      this.isLoading = true;
      const requestOptions = { url: `http://localhost:3000/events/${id}` };
      return apiFetch(requestOptions)
        .then(
          action(data => {
            this.id = data.id;
            this.title = data.title;
            this.description = data.description;
            this.startTime = data.startTime;
            this.endTime = data.endTime;
            this.allDay = data.allDay;
            this.isLoading = false;
          })
        )
        .catch(error => apiError(error));
    } else return event;
  }

  @action
  resetEvent() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.startTime = '';
    this.endTime = '';
    this.allDay = false;
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
  toggleAllDay() {
    this.allDay = !this.allDay;
  }

  @action
  submitEvent() {
    this.isLoading = true;
    const event = {
      title: this.title,
      description: this.description,
      startTime: new Date(this.startTime),
      endTime: new Date(this.endTime),
      allDay: this.allDay
    };

    return this.id
      ? calendarStore.updateEvent(event, this.id)
      : calendarStore.createEvent(event);
  }
}

export default new EventStore();
