export const mainStore = (state, action) => {
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          let obj = {};
          for(let i in state){
              obj[i] = state[i];
          }
          obj.roomName = action.roomName;
          return obj
          default: 
            return state;     
    }
}