import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'
import Card from './Card'
import { connect } from 'react-redux';

class Cards extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
   
    return (<div>
         { this.props.cards.map(this._createCards, this)}
        </div>)
  }
  
  _createCards(item, index){
    return <Card key={index} item={item.number} selected={item.selected} index={index}/> 
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards
  }
}

export default connect(mapStateToProps)(Cards)   
