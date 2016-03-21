import React from '../node_modules/react'
import classNames from 'classnames'

var rand = 360 * Math.random();

class Card extends React.Component {
   constructor (props) {
    super(props)
    this.clicked = this.clicked.bind(this)
  }
  render () {
     return <div
     style={ {background:  "hsl(" + (this.props.item + rand) + ", 100%, 50%)" } }
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
