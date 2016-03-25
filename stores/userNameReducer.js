export default function userName(state = "init", action){
    switch (action.type){
        case 'UPDATE_USERNAME':
          return  action.userName;
          default: 
            return state;     
    }
}