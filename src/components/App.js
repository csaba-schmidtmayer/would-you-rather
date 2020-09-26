import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import Login from '../pages/Login';

function App(props) {
  return (
    <div className="App">
      <LoadingBar />
      <Login />
    </div>
  );
}

export default connect()(App);
