export const messagesStore = (state ={ messages:[], showPanel:true }, action) => {
    switch (action.type){    
        case 'ADD_ROOM_MESSAGE':
          return {
            messages: [action.room_message].concat(state.messages),
            showPanel: state.showPanel
          }  
       case: 'TOGGLE_MESSAGE_PANE':   
          return {
            messages: state.messages,
            showPanel: !state.showPanel
          }     
     default:
        return state;    
    }
}
