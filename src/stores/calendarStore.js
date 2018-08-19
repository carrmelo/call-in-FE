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
  createEvent(event) {
    console.log('pruebo');
    
    const body = JSON.stringify(event);
    fetch('http://localhost:5000/events', {
      method: 'POST',
      body,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(action(data => {
        console.log('hola');
        
        console.log(data)
        this.loadEvents()
        eventStore.resetEvent()
      }))
      .catch(error => console.error(error));
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
