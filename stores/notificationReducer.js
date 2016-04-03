export const notificationStore = (state = { notification:"" }, action) => {
    switch (action.type){    
        case 'ADD_NOTIFICATION':
          return {
            notification: action.notification
          }          
     default:
        return state;    
    }
}
