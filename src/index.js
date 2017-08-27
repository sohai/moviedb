import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createEpicMiddleware } from 'redux-observable';
import {searchMovies} from "./store/epics";
import {applyMiddleware, createStore, compose } from "redux";
import { Provider } from 'react-redux';
import {movies} from "./store/reducers";

const epics = createEpicMiddleware(searchMovies);
/**
 * The redux state store, built with the Epic middleware.
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(movies, /* preloadedState, */ composeEnhancers(
  applyMiddleware(epics)
));


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
