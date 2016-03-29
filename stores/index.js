import { homeStore } from './homeStore'
import { taskStore } from './tasksStore'
import { combineReducers, createStore } from 'redux'

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
    tasks: [],
    selectedTask: {}
};

const cardStore = (state ={ cards: [ 
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
    ] }, action) => {
    switch (action.type){
        case 'CLICKED_CARD':
          return {
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
          }
        default:
          return state  
    }      
}

const userStore = (state ={ users: [] }, action) => {
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

const roomStore = (state ={ timer: 0, messages:[] }, action) => {
    switch (action.type){    
        case 'UPDATE_TIMER':
          return {
            timer: action.timer,
            messages: state.messages
          }
             case 'ADD_ROOM_MESSAGE':
          return {
            timer: action.timer,
            messages: [action.room_message].concat(state.messages)
          }          
     default:
        return state;    
    }
}

let mainStore = combineReducers({taskStore, homeStore, cardStore, userStore, roomStore})

// const mainStore = (state = init, action) => {
//     switch (action.type){
//         case 'CLICKED_CARD':
//           return {
//             roomName: state.roomName,
//             userName: state.userName,
//             message: state.message,
//             bgColor: state.bgColor,
//             link: state.link,
//             password: state.password,
//             usePass: !state.usePass,
//             cards: state.cards.map(function(item, index){
//                 if(index === action.index){
//                     return {
//                         selected : true,
//                         number: item.number
//                     }    
//                 } else {
//                     return {
//                         selected: false,
//                         number: item.number
//                     }    
//                 }
//             }),
//             users: state.users,
//             messages: state.messages,
//             topics: state.topics,
//             timer: state.timer,
//             tasks: state.tasks,
//             selectedTask: state.selectedTask
//           }
//         case 'ADD_ROOM_MESSAGE':
//           return {
//             roomName: state.roomName,
//             userName: state.userName,
//             message: state.message,
//             bgColor: state.bgColor,
//             link: state.link,
//             password: state.password,
//             usePass: state.usePass,
//             cards: state.cards,
//             messages: [action.room_message].concat(state.messages),
//             users: state.users,
//             topics: state.topics,
//             timer: state.timer,
//             tasks: state.tasks,
//             selectedTask: state.selectedTask
//           }
//         case 'ADD_USER':
//           return {
//             roomName: state.roomName,
//             userName: state.userName,
//             message: state.message,
//             bgColor: state.bgColor,
//             link: state.link,
//             password: state.password,
//             usePass: state.usePass,
//             cards: state.cards,
//             messages: state.messages,
//             users: action.users,
//             topics: state.topics,
//             timer: state.timer,
//             tasks: state.tasks,
//             selectedTask: state.selectedTask
//           } 
//         case 'REMOVE_USER':
//           return {
//             roomName: state.roomName,
//             userName: state.userName,
//             message: state.message,
//             bgColor: state.bgColor,
//             link: state.link,
//             password: state.password,
//             usePass: state.usePass,
//             cards: state.cards,
//             messages: state.messages,
//             users: state.users.filter(function(item){
//                return item.name !== action.name;
//             }),
//             topics: state.topics,
//             timer: state.timer,
//             tasks: state.tasks,
//             selectedTask: state.selectedTask
//           }
//         case 'UPDATE_TIMER':
//           return {
//             roomName: state.roomName,
//             userName: state.userName,
//             message: state.message,
//             bgColor: state.bgColor,
//             link: state.link,
//             password: state.password,
//             usePass: state.usePass,
//             cards: state.cards,
//             messages: state.messages,
//             users: state.users,
//             topics: state.topics,
//             timer: action.timer,
//             tasks: state.tasks,
//             selectedTask: state.selectedTask
//         }
//         case 'ADD_TASK':
//           let newTask = action.task;
//           newTask.index = state.tasks.length; 
//           return {
//             roomName: state.roomName,
//             userName: state.userName,
//             message: state.message,
//             bgColor: state.bgColor,
//             link: state.link,
//             password: state.password,
//             usePass: state.usePass,
//             cards: state.cards,
//             messages: state.messages,
//             users: state.users,
//             topics: state.topics,
//             timer: state.timer,
//             tasks: state.tasks.concat(newTask),
//             selectedTask: state.selectedTask
//         }

//         case 'SELECT_TASK':
//           return  {
//             roomName: state.roomName,
//             userName: state.userName,
//             message: state.message,
//             bgColor: state.bgColor,
//             link: state.link,
//             password: state.password,
//             usePass: state.usePass,
//             cards: state.cards,
//             messages: state.messages,
//             users: state.users,
//             topics: state.topics,
//             timer: state.timer,
//             tasks: state.tasks.map(function(task,index){
//                 if(index === action.task.index){
//                     action.task.selected = true;
//                     return action.task;
//                 } else {
//                     task.selected = null;
//                     return task;
//                 }
//             }),
//             selectedTask: action.task
//         }
//         case 'NEXT_TASK':
//            let nextIndex = state.selectedTask.index+1;
//            if(nextIndex < state.tasks.length){
//               let tasks = state.tasks.slice();
//               let oldIndex = state.selectedTask.index;
//               tasks[oldIndex].selected = null;
//               tasks[nextIndex].selected = true;
//               return  {
//                  roomName: state.roomName,
//                  userName: state.userName,
//                  message: state.message,
//                  bgColor: state.bgColor,
//                  link: state.link,
//                  password: state.password,
//                  usePass: state.usePass,
//                  cards: state.cards,
//                  messages: state.messages,
//                  users: state.users,
//                  topics: state.topics,
//                  timer: state.timer,
//                  tasks: tasks,
//                  selectedTask: tasks[nextIndex]
//               }
//            } else {
//               return state;
//            }
//         case 'PREV_TASK':
//            let prevIndex = state.selectedTask.index-1;
//            if(prevIndex > -1){
//               let tasks = state.tasks.slice();
//               let oldIndex = state.selectedTask.index;
//               tasks[oldIndex].selected = null;
//               tasks[prevIndex].selected = true;
//               return  {
//                  roomName: state.roomName,
//                  userName: state.userName,
//                  message: state.message,
//                  bgColor: state.bgColor,
//                  link: state.link,
//                  password: state.password,
//                  usePass: state.usePass,
//                  cards: state.cards,
//                  messages: state.messages,
//                  users: state.users,
//                  topics: state.topics,
//                  timer: state.timer,
//                  tasks: tasks,
//                  selectedTask: tasks[prevIndex]
//               }
//            } else {
//               return state;
//            }
//         default: 
//             return state;     
//     }
// }



export default mainStore
