
let init = { 
    roomName: '',
    userName: '',
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
    ],
    messages: [],
    users:[],
    topics:[],
    timer: 0,
    tasks: []
};

const mainStore = (state = init, action) => {
    switch (action.type){
        case 'UPDATE_ROOMNAME':
          return { 
            roomName: action.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }
         case 'UPDATE_USERNAME':
          return { 
            roomName: state.roomName,
            userName: action.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }

        case 'UPDATE_MESSAGE':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: action.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }  
        case 'TOGGLE_BGCOLOR': 
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: !state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }
        case 'UPDATE_LINK': 
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: action.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }  
        case 'UPDATE_PASSWORD':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: action.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }
        case 'TOGGLE_PRIVATE':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: !state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }
        case 'CLICKED_CARD':
          return {
            roomName: state.roomName,
            userName: state.userName,
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
            }),
            users: state.users,
            messages: state.messages,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }
        case 'ADD_ROOM_MESSAGE':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: [action.room_message].concat(state.messages),
            users: state.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }
        case 'ADD_USER':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: action.users,
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          } 
        case 'REMOVE_USER':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users.filter(function(item){
               return item.name !== action.name;
            }),
            topics: state.topics,
            timer: state.timer,
            tasks: state.tasks
          }
        case 'UPDATE_TOPICS':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: action.topics.concat(state.topics),
            timer: state.timer,
            tasks: state.tasks
          }
        case 'UPDATE_TIMER':
          return {
            roomName: state.roomName,
            userName: state.userName,
            message: state.message,
            bgColor: state.bgColor,
            link: state.link,
            password: state.password,
            usePass: state.usePass,
            cards: state.cards,
            messages: state.messages,
            users: state.users,
            topics: state.topics,
            timer: action.timer,
            tasks: state.tasks
        }                            
        default: 
            return state;     
    }
}

export default mainStore
