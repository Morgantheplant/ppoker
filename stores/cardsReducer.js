let cards = [ 
    {number:1, selected:false},
    {number:2, selected:false},
    {number:3, selected:false},
    {number:5, selected:false},
    {number:8, selected:false},
    {number:13, selected:false},
    {number:21, selected:false},
    {number:34, selected:false},
    {number:55, selected:false},
    {number:89, selected:false} 
]

export const cardStore = (state ={ cards: cards }, action) => {
    switch (action.type){
        case 'CLICKED_CARD':
          return {
            cards: state.cards.map(function(card, index){
                if(index === action.index){
                    return {
                        selected : true,
                        number: card.number
                    }    
                } else {
                    return {
                        selected: false,
                        number: card.number
                    }    
                }
            })
          }
        case 'RESET_PICKS':
           return { 
             cards: state.cards.map(function(card, index){
               card.selected = false;
               return card
             })
           }
        default:
          return state  
    }      
}
