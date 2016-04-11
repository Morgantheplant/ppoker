
export const userStore = (state ={ users: [], showResults: false }, action) => {
    switch (action.type){
      case 'ADD_USER':
        return {
          users: action.users,
          showResults: state.showResults
        } 
      case 'REMOVE_USER':
        return {
          users: state.users.filter(function(item){
               return item.name !== action.name;
            }),
          showResults: state.showResults
        }
      case 'SHOW_RESULTS':
        return {
          users: state.users,
          showResults: action.showResults
        }  
      default:
        return state;    
    }
}    
