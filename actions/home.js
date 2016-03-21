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
  console.log('got herereer', users)
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

export const updateTopics = function updateTopics(topics){
  return { 
    type: types.UPDATE_TOPICS,
    topics: topics
  };  
}

export const updateTimer = function updateTimer(time){
  return { 
    type: types.UPDATE_TIMER,
    timer: time
  };  
}

export const addTask = function addTask(task){
  return {
    type: types.ADD_TASK,
    task: task
  }
}
