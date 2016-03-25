export const mainStore = (state = "", action) => {
    switch (action.type){
        case 'UPDATE_TIMER':
          return  action.timer;
          default: 
            return state;     
    }
}