export const homeStore = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          return { 
            roomName: action.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass
          }
         case 'UPDATE_USERNAME':
          return { 
            roomName: state.roomName,
            userName: action.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass
          }

        case 'UPDATE_MESSAGE':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: action.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass
          }  
        case 'TOGGLE_BGCOLOR': 
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: !state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass
          }
        case 'UPDATE_LINK': 
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: action.link,
            password: state.password,
            usePass: state.usePass
          }  
        case 'UPDATE_PASSWORD':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: action.password,
            usePass: state.usePass
          }
        case 'TOGGLE_PRIVATE':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: !state.usePass
          }
        default: 
          return state;  
    }      
}          
