import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import LoginForm from './LoginForm';
import App from './App';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/dashboard" component={App} />
    </Switch>
  </Router>
);

export default Routes;
