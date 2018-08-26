import { observable, action } from 'mobx';

import { apiFetch, apiError } from '../helpers/api';
import eventStore from './eventStore';

export class CalendarStore {
  @observable
  isLoading = false;
  @observable
  events = [];

  baseUrl = 'http://localhost:3000/events';

  @action
  loadEvents() {
    this.isLoading = true;
    const requestOptions = { url: this.baseUrl };
    return apiFetch(requestOptions)
      .then(
        action(data => {
          this.events = data;
          this.isLoading = false;
        })
      )
      .catch(error => apiError(error));
  }

  @action
  createEvent(event) {
    this.isLoading = true;
    const requestOptions = {
      url: this.baseUrl,
      method: 'POST',
      body: event
    };
    return apiFetch(requestOptions)
      .then(
        action((data) => {
          this.isLoading = false;
          this.events.push(data);
          console.log(this.events);
          
          // this.loadEvents();
          eventStore.resetEvent();
        })
      )
      .catch(error => apiError(error));
  }

  @action
  updateEvent(event, id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${this.baseUrl}/${id}`,
      method: 'PUT',
      body: event
    };
    return apiFetch(requestOptions)
      .then(
        action(() => {
          this.isLoading = false;
          this.loadEvents();
          eventStore.resetEvent();
        })
      )
      .catch(error => apiError(error));
  }

  @action
  deleteEvent(id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${this.baseUrl}/${id}`,
      method: 'DELETE',
      body: { id }
    };
    return apiFetch(requestOptions)
      .then(
        action(() => {
          const item = this.events.find(item => +id === item.id);
          this.events.remove(item);
          this.loadEvents(); // added to filter the eliminated event from the calendar
          eventStore.resetEvent();
          this.isLoading = false;
        })
      )
      .catch(error => apiError(error));
  }
}

export default new CalendarStore();
