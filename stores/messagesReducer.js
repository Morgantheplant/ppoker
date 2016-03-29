export const messagesStore = (state ={ messages:[] }, action) => {
    switch (action.type){    
        case 'ADD_ROOM_MESSAGE':
          return {
            messages: [action.room_message].concat(state.messages)
          }          
     default:
        return state;    
    }
}
