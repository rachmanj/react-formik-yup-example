import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './components/home';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
