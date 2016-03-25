export const messageReducer = (state = 'Welcome to planning poker', action) => {
    switch (action.type){
        case 'UPDATE_MESSAGE':
          return  action.message;
          default: 
            return state;     
    }
}