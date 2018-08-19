import { observable, action } from 'mobx';

export class CalendarStore {

  @observable isLoading = false;
  @observable events = [];

  getEvent(event_id) {
    return this.events.filter(event => event._id === event_id);
  }

  @action loadEvents() {
    this.isLoading = true;
    return fetch("http://localhost:5000/events")
    .then(response => response.json())
    .then(action(data => {
      this.events = data
      this.isLoading = false; }))
    .catch(error => {
      console.error(error);
      this.isLoading = false; });
  }
}

export default new CalendarStore();