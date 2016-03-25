export const updatePassword = (state = "", action) => {
    switch (action.type){
        case 'UPDATE_PASSWORD':
          return  action.password;
          default: 
            return state;     
    }
}