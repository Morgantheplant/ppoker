export const mainStore = (state = "", action) => {
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          return  action.roomName;
          default: 
            return state;     
    }
}