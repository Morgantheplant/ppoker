import { homeStore } from './homeReducer'
import { taskStore } from './tasksReducer'
import { cardStore } from './cardsReducer'
import { userStore } from './usersReducer'
import { timerStore } from './timerReducer'
import { messagesStore } from './messagesReducer'
import { notificationStore } from './notificationReducer'
import { adminPaneStore } from './adminPaneReducer'
import { combineReducers, createStore } from 'redux'

let mainStore = combineReducers({
  taskStore, 
  homeStore, 
  cardStore, 
  userStore, 
  timerStore, 
  messagesStore,
  notificationStore,
  adminPaneStore 
});

export default mainStore
