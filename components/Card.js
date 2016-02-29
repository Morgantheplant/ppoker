import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'

class Card extends React.Component {
   constructor () {
    super()
  }
  render () {
     return <div

     className={classNames("card")} 
     type={this.props.item} 
     onClick={this.sendClickEvent.bind(this)} >
     <div className="top">{this.props.item}</div>
     <div className="middle">{this.props.item}</div>
     <div className="bottom">{this.props.item}</div>
     </div>
  }

  sendClickEvent(){
    console.log(this.props)
    
  }



 
}

export default Card
