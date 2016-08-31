import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Home from './components/Home';
import Room from './components/Room';
import createRoutes from './routes/routes';
import socket from './socket';
import { Router, history,  Route, browserHistory  } from 'react-router';
import mainStore from './stores';

const store = createStore(mainStore)
const routes = createRoutes(store)

require('./public/styles.min.css')

render(
  <Provider store={store}>
    <Router history={browserHistory}>
    { routes }
    </Router>
  </Provider>, document.querySelector('.react-content'))



  
 