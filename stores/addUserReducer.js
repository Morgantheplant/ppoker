export const mainStore = (state = [], action) => {
    switch (action.type){
        case 'ADD_USER':
          return  action.users;
        case 'REMOVE_USER': 
          return state.filter(function(item){
               return item.name !== action.name;
          });
        default: 
            return state;     
    }
}