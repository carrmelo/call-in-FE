import { observable, action } from 'mobx';

export class CalendarStore {
  @observable
  isLoading = false;
  @observable
  events = [];

  @action
  loadEvents() {
    this.isLoading = true;
    return fetch('http://localhost:5000/events')
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
  deleteEvent(id) {
    const body = JSON.stringify({ id });

    fetch(`http://localhost:5000/events/${id}`, {
      method: 'DELETE',
      body,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(action(() => {
        this.events.replace(this.events.filter(event => event._id !== id))
      }))
      .catch(error => console.error(error));
  }
}

export default new CalendarStore();
