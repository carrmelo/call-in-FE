import { observable, action } from 'mobx';
import eventStore from './eventStore';

export class CalendarStore {
  @observable
  isLoading = false;
  @observable
  events = [];

  @action
  loadEvents() {
    this.isLoading = true;
    return fetch('http://localhost:3000/events')
      .then(response => response.json())
      .then(
        action(data => {
          this.events = data;
          this.isLoading = false;
        })
      )
      .catch(error => {
        console.error(error);
        this.isLoading = false;
      });
  }

  @action
  createEvent(event) {
    const body = JSON.stringify(event);
    console.log(body);

    fetch('http://localhost:3000/events', {
      method: 'POST',
      body,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(
        action(data => {
          console.log('hola');

          console.log(data);
          this.loadEvents();
          eventStore.resetEvent();
        })
      )
      .catch(error => console.error(error));
  }

  @action
  updateEvent(event, id) {
    const body = JSON.stringify(event);

    fetch(`http://localhost:3000/events/${id}`, {
      method: 'PUT',
      body,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(
        action(data => {
          console.log('hola');

          console.log(data);
          this.loadEvents();
          eventStore.resetEvent();
        })
      )
      .catch(error => console.error(error));
  }

  @action
  deleteEvent(id) {
    const body = JSON.stringify({ id });

    fetch(`http://localhost:3000/events/${id}`, {
      method: 'DELETE',
      body,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => (response.status === 204 ? response : response.json()))
      .then(
        action(() => {
          const item = this.events.find(item => id !== item.id);
          this.events.remove(item);
        })
      )
      .catch(error => console.error(error));
  }
}

export default new CalendarStore();
