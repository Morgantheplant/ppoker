import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/home'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.updateRoomname = this.updateRoomname.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.submitRoomname = this.submitRoomname.bind(this)
    this.toggleBgColor = this.toggleBgColor.bind(this)
    this.togglePrivate = this.togglePrivate.bind(this)
  }
  render () {
    return (
      <div className={classNames("intro-modal", { inverse: this.props.bgColor })} >
        <h1> Welcome to Planning Poker</h1>
        <p className="message" >{this.props.message}</p>
          <div className="private-option">
            <input type="checkbox" onChange={ this.togglePrivate } /><label>Private?</label>
          </div>

        <input type="text" ref="roomNameInput" className="room-name-input" 
          onChange={ this.updateRoomname } 
          placeholder="enter a name" />
        
          { 
            // show or hide password input
            this.props.usePass ? (<input type="text" ref="roomPasswordInput" className="room-name-input" 
            onChange={this.updatePassword } 
            placeholder="enter a password" />) : null 
          }
        
        <button className={classNames('btn roomname',{ show: this.props.roomName } )} 
          onClick={ this.submitRoomname } > Sumit </button> 
        
        <p className="link-text" >Link to your ROOM:</p>
        
        { 
          //show or hide link field
          this.props.link ? (<input ref="roomLinkInput" 
            className="room-link-input" />) : null 
        }

        { 
          // show or hide link button
          this.props.link ? (
            <Link to={`/room/`+ this.props.roomName }>
              <button className="btn"> Let's Go </button>
            </Link>) : null 
        }
    </div>)
  }
  componentDidMount(){
      
      const {dispatch} = this.props;

    socket.on('room-available', function(name){

      dispatch(actions.updateLink(location.href+ `${ name }`))
      dispatch(actions.updateMessage(`Roomname "${ name }" picked`))
      if(name != this.props.roomName){
        dispatch(actions.updateRoomName(name))
      }
      this.refs.roomLinkInput.value = window.location.href+`room/${name}`
    }.bind(this))

    socket.on('room-not-available', function(){
       dispatch(actions.updateMessage( "Sorry that room already exists"))
    }.bind(this))

    dispatch(actions.updateMessage('Please enter a roomname'))

  }
  updateRoomname(e){
    const {dispatch} = this.props;
    dispatch(actions.updateRoomName(e.target.value)) 
  }
  updatePassword(e){
    const {dispatch} = this.props;
    dispatch(actions.updatePassword(e.target.value))
  }
  submitRoomname(e){
    const {dispatch} = this.props;
    var clean = this.props.roomName.replace(/\W+|\s/g,'')
    socket.emit('roomname', clean)
    this.toggleBgColor()
  }
  toggleBgColor(){
    const {dispatch} = this.props;
    dispatch(actions.toggleBgColor())
  }
  togglePrivate(){
    const {dispatch} = this.props;
    dispatch(actions.togglePrivate())
  }

}

function mapStateToProps(state) {
  //todo: only map state in this component
  let props = {};
  for(let i in state){
    if(state[i]!== 'cards'){
      props[i] = state[i];  
    }
  }
  return props;
}

export default connect(mapStateToProps)(Home)
