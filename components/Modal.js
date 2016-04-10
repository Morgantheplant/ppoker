import React from '../node_modules/react'

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
            <div>Enter your name to join room: <b>{this.props.roomname}</b></div><input ref="nameentry" />
            <button onClick={this.updateName}>enter</button>
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
