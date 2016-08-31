import React from 'react'
import classNames from 'classnames'
import Card from './Card'
import { connect } from 'react-redux';
import { clickedCard } from '../actions/home'

class Cards extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className={classNames("card-area", {"show-pane": this.props.panelShown})}>
         { this.props.cards.map(this._createCards, this)}
      </div>)
  }
  
  _createCards(item, index){
    return (
      <Card key={index} 
        item={item.number} selected={item.selected} 
        clicked={this.props.clicked} index={index}/>) 
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cardStore.cards
  }
}

export default connect(mapStateToProps)(Cards)   
