export const togglePrivate = (state = "", action) => {
    switch (action.type){
        case 'TOGGLE_PRIVATE':
          return  !state.usePass;
          default: 
            return state;     
    }
}