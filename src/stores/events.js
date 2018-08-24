import { Collection, Model } from 'mobx-rest';

class EventModel extends Model {}

class EventsCollection extends Collection {
  url() {
    return `/events`;
  }
  model() {
    return EventModel;
  }
}

export default new EventsCollection();
