export const taskStore = function(state = { tasks: [], selectedTask: { index: -1} }, action){
    switch (action.type){
        case 'ADD_TASK':
          return {
            tasks: action.tasks,
            selectedTask: state.selectedTask
        }
        case 'SELECT_TASK':
          return {
            tasks: action.tasks,
            selectedTask: action.selectedTask
          } 

        case 'NEXT_TASK':
          return {
            tasks: action.tasks,
            selectedTask: action.selectedTask
          }
        case 'PREV_TASK':
          return {
            tasks: action.tasks,
            selectedTask: action.selectedTask
          }
        default: 
          return state;     
    }
}


