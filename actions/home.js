import * as types from '../constants/index';

export const updateRoomName = function updateRoomName(name){
  return { 
    type: types.UPDATE_ROOMNAME,
    roomName: name
  };
}

export const updateUserName = function updateUserName(username){
  return { 
    type: types.UPDATE_USERNAME,
    userName: username
  };
}

export const updateMessage = function updateMessage(msg){
  return { 
    type: types.UPDATE_MESSAGE,
    message: msg 
  };
}
    
export const updateLink = function updateLink(link){
  return { 
    type: types.UPDATE_LINK,
    link: link
  }
}    

export const updatePassword = function updatePassword(pass){
  return { 
    type: types.UPDATE_PASSWORD,
    password: pass 
  };   
}

export const toggleBgColor = function toggleBgColor(){
  return { 
    type: types.TOGGLE_BGCOLOR
  };
}

export const togglePrivate = function togglePrivate(){
  return { 
    type: types.TOGGLE_PRIVATE
  };  
}

export const clickedCard = function clickedCard(index){
  return { 
    type: types.CLICKED_CARD,
    index: index
  };  
}

export const addRoomMessage = function addRoomMessage(message){
  console.log('got here', message)
  return { 
    type: types.ADD_ROOM_MESSAGE,
    room_message: message
  };  
}

export const addUser = function addUser(users){
  return { 
    type: types.ADD_USER,
    users: users
  };  
}

export const removeUser = function removeUser(name){
  return { 
    type: types.REMOVE_USER,
    name: name
  };  
}

export const updateTimer = function updateTimer(data){
  return { 
    type: types.UPDATE_TIMER,
    timer: data.time,
    timerOn: data.timerOn,
    inProgress: data.inProgress
  };  
}

export const addTask = function addTask(tasks){
  return {
    type: types.ADD_TASK,
    tasks: tasks
  }
}

export const selectTask = function(data){
  return {
    type: types.SELECT_TASK,
    tasks: data.tasks,
    selectedTask: data.selectedTask 
  }

}

export const nextTask = function(data){
  return {
    type: types.NEXT_TASK,
    tasks: data.tasks,
    selectedTask: data.selectedTask 
  }
}

export const prevTask = function(data){
  return {
    type: types.PREV_TASK,
    tasks: data.tasks,
    selectedTask: data.selectedTask 
  }
}

export const notificationMessage = function(notification){
  return {
    type: types.ADD_NOTIFICATION,
    notification: notification
  }
}

export const hideNotification = function(){
  return {
    type: types.HIDE_NOTIFICATION
  }
}

export const clearNotification = function(){
  return {
    type: types.CLEAR_NOTIFICATION
  }
}

export const toggleAdminPane = function(){
  return {
    type: types.TOGGLE_ADMIN_PANE
  }
}
