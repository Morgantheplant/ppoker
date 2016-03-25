export default function roomName(state = "deet", action){
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          return  action.roomName;
        default: 
            return state;     
    }
}