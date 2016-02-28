import React from '../node_modules/react';
import Home from '../components/Home';
import Room from '../components/Room';
import { Router, Route } from 'react-router';

let Routes = (<Route> 
      <Route path="/" component={Home}></Route>
      <Route path="room" component={Room}></Route>
    </Route>)

module.exports = Routes