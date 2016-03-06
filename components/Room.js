import React from '../node_modules/react';
import socket  from '../socket';
import classNames from 'classnames';
import Cards from './Cards';
import { addRoomMessage, addUser, removeUser, updateUserName, updateTimer, clickedCard } from '../actions/home'
import { connect } from 'react-redux';

class Room extends React.Component {
   constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.updateName = this.updateName.bind(this);
  }
  render () {
   let { roomname } = this.props.params
    return (
      <div>
        <div>
          { this.props.userName ? (
            <div className="message-panel">
              <div className="username">username: {this.props.userName}</div> 
              <div className="roomname">roomname: {roomname}</div>
               <textarea className="message-entry" ref="textarea" ></textarea>
              <button onClick={this.sendMessage} >send</button>
            </div>) : (
            <div id="modal-bg">
              <div id="modal">
                <div id="modal-content">
                  <div>Enter your name to join room: <b>{roomname}</b></div><input ref="nameentry" />
                  <button onClick={this.updateName}>enter</button>
                </div>  
              </div>
            </div>) }
        </div>

        { this.props.userName ? (
          <div className="timer">{this.props.timer}
          <button onClick={this.toggleTimer}>Start Timer</button>
          </div>
          ): null }

        <ul>{this.props.messages.map(this._createMessage, this)}</ul>

        <ul>{this.props.users.map(this._createUsers, this)}</ul>
      
        <div className="card-area">
          <Cards clicked={this.cardSelected.bind(this)} />
        </div>

      </div>)
  }

  componentDidMount(){
    let { dispatch } = this.props

    socket.on('message', function(data){
      dispatch(addRoomMessage(data))
    }.bind(this));

    socket.on('addUser', function(data){
      dispatch(addUser(data.userList))
    }.bind(this));

    socket.on('removeUser', function(data){
      dispatch(removeUser(data))
    }.bind(this));

    socket.on('updateTimer', function(data){
     dispatch(updateTimer(data.time))
    }.bind(this))

    socket.on('clickedCard', function(data){
     
    })
  
  }

  cardSelected(index){
    let { dispatch } = this.props;

    socket.emit('clickedCard', {
      name: this.props.userName,
      room: this.props.params.roomname,
      index: index
    })

     dispatch(clickedCard(index))
  }
  
  sendMessage(e){
    socket.emit('message',{
        name: this.props.userName,
        msg: this.refs.textarea.value,
        room: this.props.params.roomname
    })
    this.refs.textarea.value = '';
  }

  updateName(e){
   let { dispatch } = this.props;
    var name = this.refs.nameentry.value;
    if(name){
      dispatch(updateUserName(name))
      socket.emit('joinroom', {
        name: name,
        room: this.props.params.roomname
      })
    }
  }

  toggleTimer(){
     socket.emit('startTimer', {
      name: this.props.userName,
      room: this.props.params.roomname
     })
  }

  

  _createMessage(item, index){
     return <li key={index}><b>{item.name ? item.name + ':' : ''}</b>&nbsp;{item.msg}</li>
  }

   _createUsers(item, index){
     console.log(item)
     return <li key={index}>{item.name}<b>picked:</b>{item.pick}</li>
  }
 
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    users: state.users,
    userName: state.userName,
    timer: state.timer
  }
}


export default connect(mapStateToProps)(Room)   
