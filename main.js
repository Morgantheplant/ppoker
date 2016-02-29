import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Home from './components/Home';
import Room from './components/Room';
import createRoutes from './routes/routes';
import socket from './socket';
import { Router, history,  Route, browserHistory  } from 'react-router';

let init = { 
    roomName: '',
    message: '',
    hovered: false,
    link: '',
    password: '',
    usePass: false
}

const mainStore = (state = init, action) => {
    switch (action.type){
        case 'UPDATE_NAME':
            return { 
              roomName: state.roomName,
              message: action.msg,
              hovered: state.hovered,
              link: state.link,
              password: state.password,
              usePass: state.usePass
            }
        default: 
            return state;     
    }
}

const store = createStore(mainStore)
const routes = createRoutes(store)

render(
    <Provider store={store}>
        <Router history={browserHistory}>
        { routes }
        </Router>
    </Provider>, document.querySelector('.react-content'))



  
 