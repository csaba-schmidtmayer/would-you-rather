import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import Header from './header/Header';
import Dashboard from '../pages/Dashboard';
import Leaderboard from '../pages/Leaderboard';
import NewPoll from '../pages/NewPoll';
import Login from '../pages/Login';
import SinglePoll from '../pages/SinglePoll';
import Register from '../pages/Register';

function App(props) {
  return (
    <div className="App">
      {props.isLoggedIn ? <Header /> : null}
      <LoadingBar />
      <div className="app-body">
        <div className="main-content-area">
          <Switch>
            <Route exact path="/" component={props.isLoggedIn ? Dashboard : Login} />
            <Route path="/leaderboard" component={props.isLoggedIn ? Leaderboard : Login} />
            <Route path="/add" component={props.isLoggedIn ? NewPoll : Login} />
            <Route path="/polls/:id" component={props.isLoggedIn ? SinglePoll : Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ activeUser }) => ({
  isLoggedIn: activeUser === null ? false : true
});

export default connect(mapStateToProps)(App);
