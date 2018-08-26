import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import { configure } from 'mobx';

import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import eventStore from './stores/eventStore';
import calendarStore from './stores/calendarStore'

const stores = {
  eventStore,
  calendarStore
};

configure({ enforceActions: true });

ReactDOM.render((
  <Provider {...stores}>
    <App />
  </Provider>
), document.getElementById("root"));

registerServiceWorker();
