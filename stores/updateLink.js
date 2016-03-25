export const mainStore = (state = "", action) => {
    switch (action.type){
        case 'UPDATE_LINK':
          return  !state.bgColor;
          default: 
            return state;     
    }
}