
export const userStore = (state ={ users: [] }, action) => {
    switch (action.type){
      case 'ADD_USER':
        return {
          users: action.users,
        } 
      case 'REMOVE_USER':
        return {
          users: state.users.filter(function(item){
               return item.name !== action.name;
            }),
        }
      default:
        return state;    
    }
}    
