import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createEpicMiddleware } from 'redux-observable';
import {searchMovies} from "./epics";
import {applyMiddleware, createStore} from "redux";
import { Provider } from 'react-redux';
import {movies} from "./reducers";

const epics = createEpicMiddleware(searchMovies);
/**
 * The redux state store, built with the Epic middleware.
 */
const store = createStore(movies,
  applyMiddleware(epics)
);


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
