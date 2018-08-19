import { observable, action } from 'mobx';

import calendarStore from './calendarStore';

class Event {
  @observable _id = '';
  @observable title = '';
  @observable description = '';
  @observable startTime = null;
  @observable endTime = null;

  @action set_id(event_id) {
    if (this._id !== event_id) {
      this.resetEvent();
      this._id = event_id;
    }
  }

  @action resetEvent() {
    this.title = '';
    this.description = '';
    this.startTime = null;
    this.endTime = null;
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setDescription(description) {
    this.description = description;
  }

  @action setStartTime(startTime) {
    this.startTime = startTime;
  }

  @action setEndTime(endTime) {
    this.endTime = endTime;
  }

  @action submitEvent() {
    const event = {
      _id: this._id,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime
    };
    return (this._id
      ? calendarStore.updateEvent(event)
      : calendarStore.createEvent(event)
    ).catch(action(err => console.error(err)));
  }
}

export default new Event();
