import React from 'react'
import classNames from 'classnames'

var rand = 360 * Math.random();

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.clicked = this.clicked.bind(this)
  }
  render () {
    let value = (Math.floor(this.props.item + rand));
    let color1 = `hsl(${value}, 100%, 50%)`;
    let color2 = `hsl(${value+10}, 90%, 45%)`
    return (
      <div
        style={ {backgroundImage: `linear-gradient(${color1},${color2})` } }
        className={classNames("card", { "selected": this.props.selected } )} 
        type={this.props.item} 
        onClick={this.clicked} >
        <div className="top">{this.props.item}</div>
        <div className="middle">{this.props.item}</div>
        <div className="bottom">{this.props.item}</div>
     </div>)
  }

  clicked(){
    const {clicked, index} = this.props
    clicked(index)
  }
 
}

export default Card
