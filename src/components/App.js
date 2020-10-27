import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import Header from './header/Header';
import Dashboard from '../pages/Dashboard';
import Leaderboard from '../pages/Leaderboard';
import NewPoll from '../pages/NewPoll';
import Login from '../pages/Login';
import PollLogin from '../pages/PollLogin';
import SinglePoll from '../pages/SinglePoll';
import User from '../pages/User';
import ManageProfile from '../pages/ManageProfile';
import Register from '../pages/Register';
import PollNotFound from '../pages/PollNotFound';

function App(props) {
  return (
    <div className="App">
      {props.isLoggedIn ? <Header /> : null}
      <LoadingBar />
      <div className="app-body">
        <div className="main-content-area">
          <Switch>
            <Route exact path="/" component={props.isLoggedIn ? Dashboard : Login} />
            <Route path="/leaderboard" component={props.isLoggedIn ? Leaderboard : PollLogin} />
            <Route path="/add" component={props.isLoggedIn ? NewPoll : PollLogin} />
            <Route path="/polls/:id" component={props.isLoggedIn ? SinglePoll : PollLogin} />
            <Route path="/users/:username" component={props.isLoggedIn ? User : PollLogin} />
            <Route path="/manage/:field" component={props.isLoggedIn ? ManageProfile : PollLogin} />
            <Route path="/register" component={Register} />
            <Route path="/*" component={props.isLoggedIn ? PollNotFound : PollLogin} />
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
