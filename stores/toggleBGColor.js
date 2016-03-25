export const toggleBgColor = (state = "", action) => {
    switch (action.type){
        case 'TOGGLE_BGCOLOR':
          return  !state.bgColor;
          default: 
            return state;     
    }
}