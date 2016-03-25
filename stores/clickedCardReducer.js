export const clickedCard = (state = [], action) => {
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          return  state.map(function(item, index){
                if(index === action.index){
                    return {
                        selected : true,
                        number: item.number
                    }    
                } else {
                    return {
                        selected: false,
                        number: item.number
                    }    
                }
            })
          default: 
            return state;     
    }
}