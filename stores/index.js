
let init = { 
    roomName: '',
    message: 'Welcome to planning poker',
    bgColor: false,
    link: '',
    password: '',
    usePass: false
}

const mainStore = (state = init, action) => {
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          return { 
            roomName: state.roomName,
            message: action.msg,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass
          }
        case 'UPDATE_MESSAGE':
          return {
            roomName: state.roomName,
            message: action.msg,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass
          }  
        case 'TOGGLE_BGCOLOR': 
          return {
            roomName: state.roomName,
            message: state.msg,
            bgColor: !state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass
          }
        case 'UPDATE_LINK': 
          return {
            roomName: state.roomName,
            message: state.msg,
            bgColor: state.bgColor,
            link: action.link,
            password: state.password,
            usePass: state.usePass
          }  
        case 'UPDATE_PASSWORD':
          return {
            roomName: state.roomName,
            message: state.msg,
            bgColor: state.bgColor,
            link: state.link,
            password: action.password,
            usePass: state.usePass
          }
        case 'TOGGLE_PRIVATE':
          return {
            roomName: state.roomName,
            message: state.msg,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: !state.usePass
          }    
        default: 
            return state;     
    }
}

export default mainStore
