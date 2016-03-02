
let init = { 
    roomName: '',
    message: 'Welcome to planning poker',
    bgColor: false,
    link: '',
    password: '',
    usePass: false,
    cards:[ 
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
};

const mainStore = (state = init, action) => {
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          return { 
            roomName: action.roomName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards.slice()
          }
        case 'UPDATE_MESSAGE':
          return {
            roomName: state.roomName,
            message: action.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards.slice()
          }  
        case 'TOGGLE_BGCOLOR': 
          return {
            roomName: state.roomName,
            message: state.message,
            bgColor: !state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards.slice()
          }
        case 'UPDATE_LINK': 
          return {
            roomName: state.roomName,
            message: state.message,
            bgColor: state.bgColor,
            link: action.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards.slice()
          }  
        case 'UPDATE_PASSWORD':
          return {
            roomName: state.roomName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: action.password,
            usePass: state.usePass,
            cards: state.cards.slice()
          }
        case 'TOGGLE_PRIVATE':
          return {
            roomName: state.roomName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: !state.usePass,
            cards: state.cards.slice()
          }
        case 'CLICKED_CARD':
          return {
            roomName: state.roomName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: !state.usePass,
            cards: state.cards.map(function(item, index){
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
          }      
        default: 
            return state;     
    }
}

export default mainStore
