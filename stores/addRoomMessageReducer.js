export const mainStore = (state = [], action) => {
    switch (action.type){
        case 'ADD_ROOM_MESSAGE':
          return  [action.room_message].concat(state.messages);
          default: 
            return state;     
    }
}