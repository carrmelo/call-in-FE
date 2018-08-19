import { observable, action } from 'mobx';

export class Event {

  @observable _id = "";
  @observable title = "";
  @observable description = "";
  @observable startTime = null;
  @observable endTime = null;

}

export default new Event();