import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import App from './components/App.js';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/dance" component={App} />
    <Route path="/home" component={NotFound} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
