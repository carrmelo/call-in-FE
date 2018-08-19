import { observable, computed, action } from 'mobx';

export class CalendarStore {

  @observable events = observable.map();

  @computed get articles() {
    return this.events.values();
  }

  getEvent(event_id) {
    return this.events.get(event_id)
  }

  @action loadEvents() {
    return fetch("http://localhost:5000/events")
    .then(action(response => {
      console.log(response);      
      return response.json()}))
    .then(action(data => {
      console.log(data); 
      this.events.set(data)}))
    .catch(error => console.error(error));
  }
}

export default new CalendarStore();