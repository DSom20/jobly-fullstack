import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Jobs from './Jobs';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Company from './Company';
import Companies from './Companies';
import Home from './Home';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import './Routes.css';

function Routes() {
  console.log("inside routes");
  return (
    <div className="Container">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute exact path="/jobs">
          <Jobs />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute exact path="/companies/:handle">
          <Company />
        </PrivateRoute>
        <PrivateRoute exact path="/companies">
          <Companies />
        </PrivateRoute>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default Routes;