import { observable, action } from 'mobx';
import eventStore from './eventStore';
import { apiFetch } from '../helpers/api';

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
    return apiFetch(requestOptions).then(
      action(data => {
        this.events = data;
        this.isLoading = false;
      })
    ).catch(error => {
      console.error('---------', error);
      this.isLoading = false;
    });
  }

  @action
  createEvent(event) {
    this.isLoading = true;
    const requestOptions = {
      url: this.baseUrl,
      method: 'POST',
      body: event
    };
    return apiFetch(requestOptions).then(
      action(() => {
        this.isLoading = false;
        this.loadEvents();
        eventStore.resetEvent();
      })
    ).catch(error => {
      console.error('---------', error);
      this.isLoading = false;
    });
  }

  @action
  updateEvent(event, id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${this.baseUrl}/${id}`,
      method: 'PUT',
      body: event
    };
    return apiFetch(requestOptions).then(
      action(() => {
        this.isLoading = false;
        this.loadEvents();
        eventStore.resetEvent();
      })
    ).catch(error => {
      console.error('---------', error);
      this.isLoading = false;
    });
  }

  @action
  deleteEvent(id) {
    this.isLoading = true;
    const requestOptions = {
      url: `${this.baseUrl}/${id}`,
      method: 'DELETE',
      body: { id }
    };
    return apiFetch(requestOptions).then(
      action(() => {
        const item = this.events.find(item => +id === item.id);
        this.events.remove(item);
        this.loadEvents(); // added to filter the eliminated event from the calendar
        eventStore.resetEvent();
        this.isLoading = false;
      })
    ).catch(error => {
      console.error('---------', error);
      this.isLoading = false;
    });
  }
}

export default new CalendarStore();
