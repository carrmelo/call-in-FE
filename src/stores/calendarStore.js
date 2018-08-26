import { observable, action, computed } from 'mobx';

import { apiFetch, apiError } from '../helpers/api';
import eventStore from './eventStore';

export class CalendarStore {
  @observable
  isLoading = false;
  @observable
  eventsMap = observable.map();

  @computed
  get events() {
    return Array.from(this.eventsMap.values());
  }

  @action
  loadEvents() {
    this.isLoading = true;
    const requestOptions = { url: `${process.env.REACT_APP_SERVER_URL}` };
    return apiFetch(requestOptions)
      .then(
        action(events => {
          this.eventsMap.clear();
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
      url: `${process.env.REACT_APP_SERVER_URL}`,
      method: 'POST',
      body: event
    };
    return apiFetch(requestOptions)
      .then(
        action(event => {
          this.isLoading = false;
          this.eventsMap.set(event.id, event);
          eventStore.resetEvent();
          return event;
        })
      )
      .catch(error => apiError(error));
  }

  @action
  updateEvent(event, id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}/${id}`,
      method: 'PUT',
      body: event
    };
    return apiFetch(requestOptions)
      .then(
        action(event => {
          this.eventsMap.set(event.id, event);
          this.isLoading = false;
          eventStore.resetEvent();
          return event;
        })
      )
      .catch(error => apiError(error));
  }

  @action
  deleteEvent(id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${process.env.REACT_APP_SERVER_URL}/${id}`,
      method: 'DELETE',
      body: { id }
    };
    return apiFetch(requestOptions)
      .then(
        action(() => {
          this.eventsMap.delete(+id);
          this.isLoading = false;
          eventStore.resetEvent();
          return true;
        })
      )
      .catch(error => apiError(error));
  }
}

export default new CalendarStore();
