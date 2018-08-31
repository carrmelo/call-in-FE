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
    const requestOptions = { url: `${process.env.REACT_APP_API_HOST}` };
    return apiFetch(requestOptions)
      .then(
        action(events => {
          this.eventsMap.clear();
          events.forEach(event => this.eventsMap.set(event.id, event));
          this.isLoading = false;
        })
      )
      .catch(error => {
        console.error('---------', error);
        this.isLoading = false;
      });
  }

  @action
  createEvent(event) {
    this.isLoading = true;
    const requestOptions = {
      url: `${process.env.REACT_APP_API_HOST}`,
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
      .catch(error => {
        console.error('---------', error);
        this.isLoading = false;
      });
  }

  @action
  updateEvent(event, id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${process.env.REACT_APP_API_HOST}/${id}`,
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
      .catch(error => {
        console.error('---------', error);
        this.isLoading = false;
      });
  }

  @action
  deleteEvent(id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${process.env.REACT_APP_API_HOST}/${id}`,
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
      .catch(error => {
        console.error('---------', error);
        this.isLoading = false;
      });
  }
}

export default new CalendarStore();
