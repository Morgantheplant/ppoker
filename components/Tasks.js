import React from '../node_modules/react'
import Task from './Task'

class Tasks extends React.Component {
   constructor (props) {
    super(props)
    this.addTask = this.addTask.bind(this);
  }
  render () {
     return (
      <div className="right-panel">
         <div className="user-info">
            <div className="roomname"><i className="fa fa-home"></i> roomname: {this.props.roomname}</div>
            <div className="username"><i className="fa fa-user"></i> username: {this.props.userName}</div> 
        </div>    
        {this.props.tasks.map(this._createTasks, this)}
        <input ref="taskInput" /><i className="fa fa-plus add-task" onClick={this.addTask}></i>
      </div>)
  }
  
  _createTasks(item, index){
    return (
      <Task key={index} 
        task={item}
        index={index}
       selectTask={this.props.selectTask} />)
  }

  addTask(){
    let input = this.refs.taskInput
    if(input.value != ""){
      const {addTask} = this.props;
      let task = { 
        description: input.value,
        selected: false,
        score: null
      }
      addTask(task);
      input.value = "";   
    }
  }
}

export default Tasks
