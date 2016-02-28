import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'

class Widget extends React.Component {
  constructor () {
    super()

    this.state = { 
      roomName: '',
      message: 'Please enter a room name',
      hovered: false,
      link: '',
      password: '',
      usePass: false
    }

    socket.on('room-available', function(name){
      this.setState({
        'message': `Roomname "${ name }" picked`,
        'link': `http://path/to/root/${ name }`
      })
      if(name != this.state.roomName){
        this.setState({ roomName: name, verified: true })
      }
      this.refs.roomLinkInput.value = `http://path/to/root/${ name }` 
    }.bind(this))

    socket.on('room-not-available', function(){
       this.setState({
        'message': "Sorry that room already exists",
       })
      
    }.bind(this))
  }
  render () {
    return (
      <div className={classNames("intro-modal", { hovered: this.state.hovered })} >
        <h1> Welcome to Planning Poker</h1>
        <p className="message" >{this.state.message}</p>
          <div className="private-option">
            <input type="checkbox" onChange={ this.togglePrivate.bind(this) } /><label>Private?</label>
          </div>
        <input type="text" ref="roomNameInput" className="room-name-input" 
        onChange={this.updateRoomname.bind(this)} 
        placeholder="enter a name" />
        
        { this.state.usePass ? <input type="text" ref="roomPasswordInput" className="room-name-input" 
        onChange={this.updatePassword.bind(this)} 
        placeholder="enter a password" /> : null }
        
        <button className={classNames('btn roomname',{ show: this.state.roomName } )} 
        onClick={ this.submitRoomname.bind(this) } > Sumit </button> 
        
        <p className="link-text" >Link to your room:</p>
        
        { this.state.link ? <input ref="roomLinkInput" className="room-link-input" 
           /> : null }
        { this.state.link ? <button className="btn"> Let's Go </button>: null }
    </div>)
  }
  updateRoomname(e){
     this.setState({ roomName: e.target.value })
  }
  updatePassword(e){
     this.setState({ password: e.target.value })
  }
  submitRoomname(e){
    var clean = this.state.roomName.replace(/\W+|\s/g,'')
    socket.emit('roomname', clean)
    this.toggleBgColor()
  }
  toggleBgColor(){
    var hovered = this.state.hovered ? false : true;
    this.setState({hovered: hovered })
  }
  togglePrivate(){
    var usePass = this.state.usePass ? false : true;
    this.setState({ usePass: usePass })
  }

}

export default Widget
