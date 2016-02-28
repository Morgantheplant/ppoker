import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'
import Card from './Card'

var fibNumbers =  [1,2,3,5,8,13,21,34,55,89];

class Cards extends React.Component {
   constructor () {
    super()
  }
  render () {
   
    return (<div>
         { fibNumbers.map(this._createCards, this)}
        </div>)
  }
  
  _createCards(item, index){
    return <Card key={index} item={item} index={index}/> 
  }
}
    

export default Cards
