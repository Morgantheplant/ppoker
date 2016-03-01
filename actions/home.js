import * as types from '../constants/index';

export const updateRoomName = function updateRoomName(name){
  return { 
    type: types.UPDATE_ROOMNAME,
    roomName: name
  };
}

export const updateMessage = function updateMessage(msg){
  return { 
    type: types.UPDATE_MESSAGE,
    msg: msg 
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