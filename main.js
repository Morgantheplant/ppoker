import React from 'react'
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Room from './components/Room';
import Routes from './routes/routes';
import socket from './socket';
import { Router, history,  Route, browserHistory  } from 'react-router';


var div = document.querySelector('.react-content')
ReactDOM.render(
<Router history={browserHistory}>
    { Routes }
</Router>
, div)


 