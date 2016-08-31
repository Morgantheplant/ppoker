import React from 'react';
import Home from '../components/Home';
import Room from '../components/Room';
import socket from '../socket';
import Login from '../components/Login'

import { Router, Route } from 'react-router';

export default (store) => {
  return (
    <Route>
        <Route path="/" component={ Home }>
        </Route>
        <Route path="room/:roomname" component={ Room } />
        <Route path="login" component={Login} authenticated="false" />
    </Route>   
  );
};
