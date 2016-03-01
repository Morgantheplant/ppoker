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
      <div className={classNames("intro-modal", { hovered: this.props.hovered })} >
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
      debugger
      dispatch(actions.updateLink(location.href+ `${ name }`))
      dispatch(actions.updateMessage(`Roomname "${ name }" picked`))
      dispatch(actions.updateRoomName(name))
      // this.setState({
      //   'message': `Roomname "${ name }" picked`,
      //   'link': `http://path/to/room/${ name }`
      // })
      // if(name != this.props.roomName){
      //   this.setState({ roomName: name, verified: true })
      // }
      this.refs.roomLinkInput.value = window.location.href+ `room/${name}`
    }.bind(this))

    socket.on('room-not-available', function(){
       dispatch(actions.updateMessage( "Sorry that room already exists"))
       // this.setState({
       //  'message': "Sorry that room already exists",
       // })
      
    }.bind(this))

  }
  updateRoomname(e){
    const {dispatch} = this.props;
    dispatch(actions.updateRoomName(e.target.value)) 
     // this.setState({ roomName: e.target.value })
  }
  updatePassword(e){
    const {dispatch} = this.props;
    dispatch(actions.updatePassword(e.target.value))
     // this.setState({ password: e.target.value })
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
    // var hovered = this.props.hovered ? false : true;
    // this.setState({hovered: hovered })
  }
  togglePrivate(){
    const {dispatch} = this.props;
    dispatch(actions.togglePrivate())
    // var usePass = this.props.usePass ? false : true;
    // this.setState({ usePass: usePass })
  }

}

function mapStateToProps(state) {
  //todo: only map state in this component
  let props = {};
  for(let i in state){
    props[i] = state[i];
  }
  return props;
}

export default connect(mapStateToProps)(Home)
