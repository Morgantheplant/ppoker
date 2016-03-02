import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'
import Card from './Card'
import { connect } from 'react-redux';
import {clickedCard } from '../actions/home'

class Cards extends React.Component {
   constructor (props) {
    super(props)
    this.clicked = this.clicked.bind(this)
  }
  render () {
   
    return (<div>
         { this.props.cards.map(this._createCards, this)}
        </div>)
  }
  
  _createCards(item, index){
    return (
      <Card key={index} 
        item={item.number} selected={item.selected} 
        clicked={this.clicked} index={index}/>) 
  }
  clicked(index){
    const { dispatch } = this.props
    dispatch(clickedCard(index))
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards
  }
}

export default connect(mapStateToProps)(Cards)   
