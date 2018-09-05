// @flow

import { observable, action } from 'mobx';

import calendarStore from './calendarStore';
import { apiFetch, apiError } from '../helpers/api';
import { toCorrectDate } from '../helpers/correctDateTime';

export class EventStore {
  @observable isLoading = false;

  @observable id: string = '';
  @observable title: string = '';
  @observable description: string = '';
  @observable startTime: string = '';
  @observable endTime: string = '';
  @observable allDay: boolean = false;
  url: string = process.env.REACT_APP_API_HOST || 'http://localhost:3000/events';

  getEvent(event_id: number) {
    const event = calendarStore.eventsMap.get(event_id);
    if (event) {
      this.id = event.id;
      this.title = event.title;
      this.description = event.description;
      this.startTime = event.startTime;
      this.endTime = event.endTime;
      return event;
    }
  }

  @action
  set_id(event_id: string) {
    if (this.id !== event_id) {
      this.resetEvent();
      this.id = event_id;
    }
  }

  @action
  loadInitialData() {
    return !this.id ? this.resetEvent() : this.loadEvent(this.id);
  }

  @action
  loadStartAndEndTime(start: Date, end: Date) {
    this.startTime = toCorrectDate(start).substring(0, 16);
    this.endTime = toCorrectDate(end).substring(0, 16);
  }

  @action
  loadEvent(id: string) {
    const event = this.getEvent(+id);
    if (!event) {
      this.isLoading = true;
      const requestOptions = { url: `${this.url}/${id}` };
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
        .catch(error => {
          console.error('---------', error);
          this.isLoading = false;
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
    this.allDay = false;
  }

  @action
  setEventProperty(name: string, value: string) {
    this[name] = value;
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
