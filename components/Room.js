import React from '../node_modules/react';
import socket  from '../socket';
import classNames from 'classnames';
import Cards from './Cards';
import { connect } from 'react-redux';
import MessagePanel from './MessagePanel'
import AdminSelect from './AdminSelect'
import Tasks from './Tasks'
import moment from 'moment';
import { addRoomMessage, addUser, 
  removeUser, updateUserName, 
  updateTimer, clickedCard, timerOn, timerOff,
  addTask, selectTask, nextTask, prevTask } from '../actions/home'

class Room extends React.Component {
   constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.updateName = this.updateName.bind(this);
    this.addTask = this.addTask.bind(this);
    this.selectTask = this.selectTask.bind(this);
    this.nextTask = this.nextTask.bind(this);
    this.prevTask = this.prevTask.bind(this);
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
        
        <div className="task-heading" >
        { 
          this.props.selectedTask ? ( <h3 className="selected-task">{
            this.props.selectedTask.description
          }</h3>
          ) : null }
        </div>  

          
        { this.props.userName ? (
          <div className="timer">
            <AdminSelect users={this.props.users} />
            <Tasks 
              timer={this.props.timer}
              timerOn={this.props.timerOn}
              toggleTimer={this.toggleTimer}
              tasks={this.props.tasks}
              prevTask={this.prevTask} 
              nextTask={this.nextTask}
              addTask={this.addTask} selectTask={this.selectTask} />
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
    
    socket.on('addTask', function(data){
      dispatch(addTask(data.tasks))
    }.bind(this));

    socket.on('nextTask', function(){
      dispatch(nextTask())
    }.bind(this));

    socket.on('prevTask', function(){
      dispatch(prevTask())
    }.bind(this));

    socket.on('updateTimer', function(data){
     dispatch(updateTimer(data.time))
     if(data.timerOn){
       dispatch(timerOn())
     }
     if(data.timerOn === false){
      dispatch(timerOff())
     }
    }.bind(this))

    socket.on('clickedCard', function(data){
     
    })
  
  }

  cardSelected(index){
    let { dispatch } = this.props;
    socket.emit('clickedCard', {
      name: this.props.userName,
      room: this.props.params.roomname,
      index: index,
      selected: this.props.selectedTask
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
    if(this.props.selectedTask.index > -1){
      var selected = this.props.selectedTask
       socket.emit('startTimer', {
        name: this.props.userName,
        room: this.props.params.roomname,
        selected: selected 
      })
    } else {
      //todo: replace this with top message
      alert('select a task first')
    }
  }

  addTask(item){
    socket.emit('addTask', {
      task: item,
      room: this.props.params.roomname
    })
  }

  nextTask(){
    if(!this.props.timerOn){
      socket.emit('nextTask', {
        room: this.props.params.roomname
      })
    
    } else {
      alert("Still picking totals for task: " + this.props.selectedTask.description);
    }
  }

  prevTask(){
    if(!this.props.timerOn){
      socket.emit('prevTask', {
        room: this.props.params.roomname
      })
    } else {
      alert("Still picking totals for task: " + this.props.selectedTask.description);
    }
  }

  selectTask(task){
    if(!this.props.timerOn){
      let { dispatch } = this.props;
      task.selected = true;
      dispatch(selectTask(task));
    } else {
      alert("Still picking totals for task: " + this.props.selectedTask.description)
    }
  }

  _createUsers(item, index){
    return <li className="user" key={index}>{item.name}<b>{ item.pick }</b> </li>
  }

 
 
}

function mapStateToProps(state) {
  return {
    messages: state.messagesStore.messages,
    users: state.userStore.users,
    userName: state.homeStore.userName,
    timer: state.timerStore.timer,
    timerOn: state.timerStore.timerOn,
    tasks: state.taskStore.tasks,
    selectedTask: state.taskStore.selectedTask
  }
}



export default connect(mapStateToProps)(Room)   
