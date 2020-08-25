import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom'

import App from './App'
import './css/reset'


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept()
}
