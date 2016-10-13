import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers,
  window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
      </Route>
    </Router>
  </Provider>
, document.querySelector('#react-container'));
