import { observable, action, computed } from 'mobx';

import { apiFetch, apiError } from '../helpers/api';
import eventStore from './eventStore';

export class CalendarStore {
  @observable
  isLoading = false;
  @observable
  eventsMap = observable.map();
  // events = [];

  baseUrl = 'http://localhost:3000/events';

  @computed get events() {
    return Array.from(this.eventsMap.values());
  }

  @action
  loadEvents() {
    this.isLoading = true;
    const requestOptions = { url: this.baseUrl };
    return apiFetch(requestOptions)
      .then(
        action((events) => {
          this.eventsMap.clear()
          events.forEach(event => this.eventsMap.set(event.id, event));
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
          this.events.push(data); // updates list alone.          
          this.loadEvents(); // adds the new event in the calendar (not reacting to array.push)
          console.log(this.events);
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
        action((data) => {
          const item = this.events.find(item => +id === item.id);
          this.events.remove(item);
          this.events.push(data);
          this.isLoading = false;
          this.loadEvents(); // replace the edited event in the calendar
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
          this.isLoading = false;
          this.loadEvents(); // filters the eliminated event from the calendar
          eventStore.resetEvent();
        })
      )
      .catch(error => apiError(error));
  }
}

export default new CalendarStore();
