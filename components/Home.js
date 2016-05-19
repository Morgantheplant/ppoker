import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classnames'
import MessagePane from './MessagePane'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/home'
import NotificationPanel from './NotificationPanel';

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.updateRoomname = this.updateRoomname.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.submitRoomname = this.submitRoomname.bind(this)
    this.toggleBgColor = this.toggleBgColor.bind(this)
    this.togglePrivate = this.togglePrivate.bind(this)
    this.toggleMessage = this.toggleMessage.bind(this)
  }
  render () {
    return (
      <div className="main-bg">
      
      <NotificationPanel 
        message={this.props.notification} 
        show={this.props.notificationShow} 
        />
      
      <div className={classNames("intro-modal", { inverse: this.props.bgColor })} >

        <div className="login-container">
          <div className="intro-title"><i className="fa fa-database pokerchips"></i>
            <div className="title-container">
              <h1 className="main-title">Planning</h1>
              <h1 className="main-title">Pokerify</h1>
            </div>
        </div>
        
        <button className="asana-button" onClick={this.toggleMessage}>LOG IN WITH ASANA</button>
        
        <div className="or-contianer">
          <div className="or-line-left"></div>
          <div className="or">OR</div>
          <div className="or-line-right"></div>
        </div>

          <input type="text" ref="roomNameInput" className="room-name-input" 
            onChange={ this.updateRoomname } 
            placeholder="enter a roomname" />
         
          <input type="text" ref="roomPasswordInput" className={classNames("room-name-input password", { "password-on": this.props.usePass})} 
          onChange={this.updatePassword } 
          placeholder="enter a password" /> 
          
          <div className={classNames("private-option", {"private-on": this.props.usePass})}>
            <div><div classNames="private-text">MAKE PRIVATE</div> 
            <div onClick={ this.togglePrivate } className={classNames("toggleTrack", {"password-on": this.props.usePass})}><div className="toggleThumb"></div></div></div>
          </div>
          
            { 
            // show or hide link button
            this.props.link ? (
              <Link className="room-link" to={`/room/`+ this.props.roomName }>
                <button className="btn roomname"> ENTER ROOM </button> 
              </Link>) : <button className="btn roomname" onClick={ this.submitRoomname } > CREATE </button> 
          }
          <p className="link-text" >LINK TO ROOM:</p>
          { 
            //show or hide link field
            this.props.link ? (<input ref="roomLinkInput" 
              className="room-link-input" />) : null 
          }
        </div>
    </div>

    { this.props.toggleAsanaMessage ? <MessagePane toggleMessage={this.toggleMessage} content="Sorry, this feature is still under construction..."/>  : null }

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
       this.notifyMessage("Sorry that room already exists");
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

  notifyMessage(message){
    let { dispatch } = this.props;
    dispatch(actions.notificationMessage(message));
    if(this.timeout){
      clearTimeout(this.timeout)
      this.hideNofity(dispatch);
    } else {
      this.hideNofity(dispatch);
    }
  }

  hideNofity(dispatch){
    this.timeout = setTimeout(function(){
      dispatch(actions.hideNotification());
      this.timeout = null;
    }.bind(this),2000)
  }

  toggleMessage(){
     let { dispatch } = this.props;
     dispatch(actions.toggleAsanaMessage());
  }

}

function mapStateToProps(state) {
  return {
    roomName: state.homeStore.roomName, 
    userName: state.homeStore.userName,
    link: state.homeStore.link,
    bgColor: state.homeStore.bgColor,
    usePass: state.homeStore.usePass,
    notification: state.notificationStore.notification,
    notificationShow: state.notificationStore.show,
    toggleAsanaMessage: state.homeStore.toggleAsanaMessage 
  }
}

export default connect(mapStateToProps)(Home)
