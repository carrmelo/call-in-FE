import { observable } from 'mobx';

export class CalendarStore {

  @observable events = observable.map();

}

export default new CalendarStore();