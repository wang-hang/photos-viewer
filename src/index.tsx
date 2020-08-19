import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App'
import './css/reset'

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept()
}
