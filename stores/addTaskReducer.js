export const mainStore = (state = [], action) => {
    switch (action.type){
        case 'ADD_TASK':
          return   state.concat(newTask);
          default: 
            return state;     
    }
}