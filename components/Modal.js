import React from 'react'

class Modal extends React.Component {
   constructor (props) {
    super(props)
    this.updateName = this.updateName.bind(this)
  }
  render () {
    return (
      <div id="modal-bg">
        <div id="modal">
          <div id="modal-content">
            <div>JOINING ROOM: <b>{this.props.roomname}</b></div><input ref="nameentry" placeholder="enter your name to begin"/>
            <button onClick={this.updateName}>ENTER</button>
          </div>  
        </div>
      </div>) 
  }

  updateName(){
    const {updateName} = this.props
    updateName(this.refs)
  }
 
}

export default Modal
