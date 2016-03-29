export const timerStore = (state ={ timer: 0 }, action) => {
    switch (action.type){    
        case 'UPDATE_TIMER':
          return {
            timer: action.timer
          }
     default:
        return state;    
    }
}