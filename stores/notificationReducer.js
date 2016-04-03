export const notificationStore = (state = { notification:"" }, action) => {
    switch (action.type){    
        case 'ADD_NOTIFICATION':
          return {
            notification: action.notification,
            show: true
          }
        case 'HIDE_NOTIFICATION':
          return {
            notification: state.notification,
            show: false
          }
        case 'CLEAR_NOTIFICATION':
          return {
            notification: "",
            show: false
          }           
     default:
        return state;    
    }
}
