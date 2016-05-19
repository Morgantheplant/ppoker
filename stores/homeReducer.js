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
            usePass: state.usePass,
            toggleAsanaTooltip: state.toggleAsanaTooltip      
          }
         case 'UPDATE_USERNAME':
          return { 
            roomName: state.roomName,
            userName: action.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            toggleAsanaTooltip: state.toggleAsanaTooltip
          }

        case 'UPDATE_MESSAGE':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: action.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            toggleAsanaTooltip: state.toggleAsanaTooltip
          }  
        case 'TOGGLE_BGCOLOR': 
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: !state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            toggleAsanaTooltip: state.toggleAsanaTooltip
          }
        case 'UPDATE_LINK': 
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: action.link,
            password: state.password,
            usePass: state.usePass,
            toggleAsanaTooltip: state.toggleAsanaTooltip
          }  
        case 'UPDATE_PASSWORD':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: action.password,
            usePass: state.usePass,
            toggleAsanaTooltip: state.toggleAsanaTooltip
          }
        case 'TOGGLE_PRIVATE':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: !state.usePass,
            toggleAsanaTooltip: state.toggleAsanaTooltip
          }
        case 'TOGGLE_ASANA_MESSAGE':
          console.log('called')
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            toggleAsanaMessage: !state.toggleAsanaMessage 
          }
        default: 
          return state;  
    }      
}          
