import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classnames'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/home'
import config from '../config';

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
      <div className="main-bg">
      <div className={classNames("intro-modal", { inverse: this.props.bgColor })} >
        <div className="intro-title"><i className="fa fa-database pokerchips"></i>
            <h1 className="main-title">Planning Pokerify</h1>
        </div>

        <div className="login-container">
        <button className="asana-button">LOG IN WITH ASANA</button>
        <div className="or-contianer">
          
          <div className="or-line">
            <div className="or">OR</div>
            </div>
          </div>

        <input type="text" ref="roomNameInput" className="room-name-input" 
          onChange={ this.updateRoomname } 
          placeholder="enter a roomname" />
       
        <input type="text" ref="roomPasswordInput" className={classNames("room-name-input password", { "password-on": this.props.usePass})} 
        onChange={this.updatePassword } 
        placeholder="enter a password" /> 
        
        <div className="private-option">
          <div><div classNames="private-text">Private?</div> 
          <div onClick={ this.togglePrivate } className={classNames("toggleTrack", {"password-on": this.props.usePass})}><div className="toggleThumb"></div></div></div>
        </div>
        
        <button className={classNames('btn roomname',{ show: this.props.roomName } )} 
          onClick={ this.submitRoomname } > CREATE </button> 
          </div>
        
        <p className="link-text" >Link to Room:</p>
        
        { 
          //show or hide link field
          this.props.link ? (<div><input ref="roomLinkInput" 
            className="room-link-input" /><a href={config.asana_link_req} target="_blank" ><button>ASANA</button></a></div>) : null 
        }

        { 
          // show or hide link button
          this.props.link ? (
            <Link to={`/room/`+ this.props.roomName }>
              <button className="btn"> Let's Go </button>
            </Link>) : null 
        }
    </div>
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
  return {
    roomName: state.homeStore.roomName, 
    userName: state.homeStore.userName,
    link: state.homeStore.link,
    message: state.homeStore.message,
    bgColor: state.homeStore.bgColor,
    usePass: state.homeStore.usePass   
  }
}

export default connect(mapStateToProps)(Home)
