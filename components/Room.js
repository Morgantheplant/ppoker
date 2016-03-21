import React from '../node_modules/react';
import socket  from '../socket';
import classNames from 'classnames';
import Cards from './Cards';
import { addRoomMessage, addUser, removeUser, updateUserName, updateTimer, clickedCard, addTask } from '../actions/home'
import { connect } from 'react-redux';
import MessagePanel from './MessagePanel'
import AdminSelect from './AdminSelect'
import Tasks from './Tasks'
import moment from 'moment';

class Room extends React.Component {
   constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.updateName = this.updateName.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  render () {
   let { roomname } = this.props.params
    return (
      <div>
        <div>
          
          { this.props.userName ? null : (
            <div id="modal-bg">
              <div id="modal">
                <div id="modal-content">
                  <div>Enter your name to join room: <b>{roomname}</b></div><input ref="nameentry" />
                  <button onClick={this.updateName}>enter</button>
                </div>  
              </div>
            </div>) 
          }
        </div>

          
        { this.props.userName ? (
          <div className="timer">{this.props.timer}
          <button onClick={this.toggleTimer}>Start Timer</button>
            <AdminSelect users={this.props.users} />
            <Tasks tasks={this.props.tasks} addTask={this.addTask} />
          </div>
          ): null }
        
        { this.props.userName ?  <MessagePanel 
          userName={this.props.userName} 
          roomname={roomname} 
          messages={this.props.messages}
          sendMessage={this.sendMessage.bind(this)} /> : null }
       
        
        <ul className="users">
          {this.props.users.map(this._createUsers, this)} 
        </ul>
        
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
  
  sendMessage(ref){
    socket.emit('message',{
        name: this.props.userName,
        msg: ref.value,
        room: this.props.params.roomname
    })
    ref .value = '';
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

  addTask(item){
    let { dispatch } = this.props;
    dispatch(addTask(item));
  }

  _createUsers(item, index){
    return <li className="user" key={index}>{item.name}<b>{ item.pick }</b> </li>
  }

 
 
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    users: state.users,
    userName: state.userName,
    timer: state.timer,
    tasks: state.tasks
  }
}


export default connect(mapStateToProps)(Room)   
