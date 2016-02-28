import React from 'react'
import ReactDOM from 'react-dom';
import Widget from './components/Widget';
import socket from './socket'

var div = document.querySelector('.react-content')
ReactDOM.render(<Widget aid={ 123 } uid={ 123 } />, div)

 