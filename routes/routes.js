import React from '../node_modules/react';
import Home from '../components/Home';
import Room from '../components/Room';
import socket from '../socket';

import { Router, Route } from 'react-router';

export default (store) => {
  return (
    <Route>
        <Route path="/" component={ Home }>
        </Route>
        <Route path="room/:roomname" component={ Room } />
    </Route>   
  );
};
