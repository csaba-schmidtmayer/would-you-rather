import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import configureStore from './utils/configureStore';
import * as serviceWorker from './serviceWorker';
import './css/main.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/would-you-rather">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
