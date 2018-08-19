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

  getEvent(event_id) {
    return { ...this.events.filter(event => event._id === event_id) };
  }

  @action
  loadEvent(id) {
    const event = this.getEvent(id);
    if (!event) {
      this.isLoading = true;
      return {
        ...fetch(`http://localhost:5000/events/${id}`)
          .then(response => response.json())
          .then(action(data => (this.isLoading = false)))
          .catch(error => {
            this.isLoading = false;
            console.error(error);
          })
      };
    } else return event;
  }
}

export default new CalendarStore();
