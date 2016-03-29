export const taskStore = function(state = { tasks: [], selectedTask: { index: 0} }, action){
    switch (action.type){
        case 'ADD_TASK':
          let newTask = action.task;
          newTask.index = state.tasks.length; 
          return {
            tasks: state.tasks.concat(newTask),
            selectedTask: state.selectedTask
        }
        case 'SELECT_TASK':
          return  {
            tasks: state.tasks.map(function(task,index){
                if(index === action.task.index){
                    action.task.selected = true;
                    return action.task;
                } else {
                    task.selected = null;
                    return task;
                }
            }),
            selectedTask: action.task
        }
        case 'NEXT_TASK':
           let nextIndex = state.selectedTask.index+1;
           if(nextIndex < state.tasks.length){
              let tasks = state.tasks.slice();
              let oldIndex = state.selectedTask.index;
              tasks[oldIndex].selected = null;
              tasks[nextIndex].selected = true;
              return  {
                 tasks: tasks,
                 selectedTask: tasks[nextIndex]
              }
           } else {
              return state;
           }
        case 'PREV_TASK':
           let prevIndex = state.selectedTask.index-1;
           if(prevIndex > -1){
              let tasks = state.tasks.slice();
              let oldIndex = state.selectedTask.index;
              tasks[oldIndex].selected = null;
              tasks[prevIndex].selected = true;
              return  {
                 tasks: tasks,
                 selectedTask: tasks[prevIndex]
              }
           } else {
              return state;
           }
        default: 
          return state;     
    }
}


