export const timerStore = (state ={ timer: 0, timerStarted: false}, action) => {
    switch (action.type){    
        case 'UPDATE_TIMER':
          return {
            timer: action.timer,
            timerStarted: state.timerStarted
          }
        case 'TIMER_ON':
          return {
            timer: state.timer,
            timerOn: true
          }
        case 'TIMER_OFF':
          return {
            timer: state.timer,
            timerOn: false
          }
     default:
        return state;    
    }
}
