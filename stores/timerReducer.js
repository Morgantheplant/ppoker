export const timerStore = (state ={ timer: 0, timerOn: false, inProgress: false}, action) => {
    switch (action.type){    
        case 'UPDATE_TIMER':
          debugger
          return {
            timer: action.timer,
            timerOn: action.timerOn,
            inProgress: action.inProgress
          }
     default:
        return state;    
    }
}
