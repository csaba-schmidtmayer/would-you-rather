import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogicMiddleware } from 'redux-logic';
import axios from 'axios';

import rootReducer from '../reducers';
import logic from '../logic';
import { fetchData } from '../actions/storeActions';

/* Configure logic middleware */
const httpClient = axios.create({baseURL: 'https://schmiczy.eu/would-you-rather-server'});
httpClient.defaults.headers.common['Content-Type'] = 'application/json';
const sessionToken = window.sessionStorage.getItem('sessionToken');
if (sessionToken !== undefined) {
  httpClient.defaults.headers.common['Authorization'] = sessionToken;
}
const dependencies = {
  httpClient
};
const logicMiddleware = createLogicMiddleware(logic, dependencies);

/* Configure store */
const configureStore = (preloadedState = {}) => {
  const middlewares = [
    logicMiddleware
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // If a sessionToken is available, fetch the data from the server
  if (sessionToken !== undefined && sessionToken !== null) {
    store.dispatch(fetchData());
  }

  return store;
}

export default configureStore;
