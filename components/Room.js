import React from '../node_modules/react';
import socket  from '../socket';
import classNames from 'classnames';
import Cards from './Cards';
import NotificationPanel from './NotificationPanel'
import { connect } from 'react-redux';
import MessagePanel from './MessagePanel'
import AdminSelect from './AdminSelect'
import Tasks from './Tasks'
import Controls from './Controls'
import Modal from './Modal'

import moment from 'moment';
import { addRoomMessage, addUser, 
  removeUser, updateUserName, notificationMessage, 
  hideNotification, clearNotification, toggleAdminPane, resetPicks,
  updateTimer, clickedCard, timerOn, timerOff, toggleMessagePane,
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
    this.toggleAdminPane = this.toggleAdminPane.bind(this);
    this.toggleMessagePane = this.toggleMessagePane.bind(this);
  }
  render () {
    return (
      <div>
        <div>
           
          <NotificationPanel 
            message={this.props.notification} 
            show={this.props.notificationShow} 
             />

          <div className="main-title-contianer"><i className="fa fa-database pokerchips"></i>
            <h1 className="main-title">Planning Pokerify</h1>
            <i className={classNames("fa fa-inbox inbox", {on:this.props.showMessagePanel})} onClick={this.toggleMessagePane}></i>
            <AdminSelect users={this.props.users} 
            toggleAdminPane={this.toggleAdminPane}
            show={this.props.showAdminPane}
            />
          </div>

          {this.props.userName ? null : (
            <Modal 
              updateName={this.updateName} 
              roomname={this.props.params.roomname} />
            )}
        </div>
        
        <div className="task-heading" >
          <h3 className="selected-task">
          { 
            this.props.selectedTask.description || "Add tasks at the top right to begin" 
          }
          </h3>
        </div>  
        
        <Controls  timer={this.props.timer}
              timerOn={this.props.timerOn}
              toggleTimer={this.toggleTimer}
              prevTask={this.prevTask} 
              nextTask={this.nextTask} />
          
        
      
        <Tasks 
          tasks={this.props.tasks}
          userName={this.props.userName}
          roomname={this.props.params.roomname} 
          addTask={this.addTask} 
          selectTask={this.selectTask} />
      
        
        
        <MessagePanel 
          showPanel={this.props.showMessagePanel}
          messages={this.props.messages}
          sendMessage={this.sendMessage.bind(this)} />
       
        
        <ul className="users">
          {this.props.users.map(this._createUsers, this)} 
        </ul>
        
        <Cards
          panelShown={this.props.showMessagePanel}  
          clicked={this.cardSelected.bind(this)} />
        

      </div>)
  }

  componentDidMount(){
    let { dispatch } = this.props

    socket.on('message', function(data){
      dispatch(addRoomMessage(data))
    });

    socket.on('addUser', function(data){
      dispatch(addUser(data.userList))
    });

    socket.on('removeUser', function(data){
      dispatch(removeUser(data))
    });
    
    socket.on('addTask', function(data){
      dispatch(addTask(data.tasks))
    });

    socket.on('notification', function(data){
      this.notifyMessage(data);
    });

    socket.on('selectTask', function(data){
      dispatch(selectTask(data))
    });

    socket.on('nextTask', function(data){
      dispatch(nextTask(data))
    });

    socket.on('prevTask', function(data){
      dispatch(prevTask(data))
    });

    socket.on('updateTimer', function(data){
     dispatch(updateTimer(data))
    });

    socket.on('resetPicks', function(){
      dispatch(resetPicks())
    });
  
  }

  notifyMessage(message){
    let { dispatch } = this.props;
    dispatch(notificationMessage(message));
    if(this.timeout){
      clearTimeout(this.timeout)
      this.hideNofity(dispatch);
    } else {
      this.hideNofity(dispatch);
    }
  }

  hideNofity(dispatch){
    this.timeout = setTimeout(function(){
      dispatch(hideNotification());
      this.timeout = null;
    }.bind(this),2000)
  }

  cardSelected(index){
    let { dispatch } = this.props;
    if(this.props.inProgress){
      socket.emit('clickedCard', {
        name: this.props.userName,
        room: this.props.params.roomname,
        index: index,
        selected: this.props.selectedTask
      })
    }
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

  updateName(ref){
   let { dispatch } = this.props;
    var name = ref.nameentry.value;
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
      let { dispatch } = this.props;
      this.notifyMessage("Select a task first");
    }
  }

  toggleAdminPane(){
    let { dispatch } = this.props;
    dispatch(toggleAdminPane())
  }

  toggleMessagePane(){
    let { dispatch } = this.props;
    dispatch(toggleMessagePane())
  }

  addTask(item){
    socket.emit('addTask', {
      task: item,
      room: this.props.params.roomname
    })
  }

  nextTask(){
    if(!this.props.inProgress){
      socket.emit('nextTask', {
        room: this.props.params.roomname
      })
    
    } else {
      let { dispatch } = this.props;
      this.notifyMessage(("Still picking totals for task: " + this.props.selectedTask.description));
    }
  }

  prevTask(){
    if(!this.props.inProgress){
      socket.emit('prevTask', {
        room: this.props.params.roomname
      })
    } else {
       let { dispatch } = this.props;
      this.notifyMessage(("Still picking totals for task: " + this.props.selectedTask.description))
    }
  }

  selectTask(task){
    if(!this.props.inProgress){
      task.selected = true;
      socket.emit('selectTask', {
        task: task,
        room: this.props.params.roomname
      })
    } else {
      let { dispatch } = this.props;
      this.notifyMessage(("Still picking totals for task: " + this.props.selectedTask.description))
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
    inProgress: state.timerStore.inProgress,
    tasks: state.taskStore.tasks,
    selectedTask: state.taskStore.selectedTask,
    notification: state.notificationStore.notification,
    notificationShow: state.notificationStore.show,
    showAdminPane: state.adminPaneStore.showPane,
    showMessagePanel: state.messagesStore.showPanel
  }
}



export default connect(mapStateToProps)(Room)   
