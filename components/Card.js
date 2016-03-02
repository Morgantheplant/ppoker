import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'

class Card extends React.Component {
   constructor (props) {
    super(props)
    this.clicked = this.clicked.bind(this)
  }
  render () {
     return <div

     className={classNames("card", { "selected": this.props.selected } )} 
     type={this.props.item} 
     onClick={this.clicked} >
     <div className="top">{this.props.item}</div>
     <div className="middle">{this.props.item}</div>
     <div className="bottom">{this.props.item}</div>
     </div>
  }

  clicked(){
    const {clicked, index} = this.props
    clicked(index)
  }
 
}

export default Card
