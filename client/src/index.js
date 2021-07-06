import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './containers/App';

const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  // ...options
  collapsed: true,
});

const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem('token'),
    },
  },
  composedEnhancers(applyMiddleware(reduxThunk), applyMiddleware(logger))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root'));
