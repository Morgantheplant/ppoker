import React from 'react'
import classNames from 'classnames'
import Card from './Card'
import { connect } from 'react-redux';
import { clickedCard } from '../actions/home'

class Topics extends React.Component {
  constructor (props) {
    super(props)
    this.clicked = this.clicked.bind(this)
  }
  render () {
   
    return (<div>
         { this.props.cards.map(this._createTopics, this)}
        </div>)
  }
  
  _createTopics(item, index){
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

export default connect(mapStateToProps)(Topics)   
