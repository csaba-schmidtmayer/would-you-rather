import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import Login from '../pages/Login';
import Register from '../pages/Register';

function App(props) {
  return (
    <div className="App">
      <LoadingBar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default connect()(App);
