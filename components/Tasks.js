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
            <h2 className="section-title">ROOM INFO</h2>
            <div className="roomname"><i className="fa fa-home icon"></i> {this.props.roomname}</div>
            <div className="username"><i className="fa fa-user icon"></i> {this.props.userName}</div> 
            <div className="import-tasks"><i className="fa fa-sign-in icon"></i>Import tasks</div> 
        </div>
        <h2 className="section-title">YOUR TASKS</h2>    
        {this.props.tasks.map(this._createTasks, this)}
        <div className="task-input-container">
        <i className="fa fa-plus add-task" onClick={this.addTask}></i>
        <input className="create-task" ref="taskInput" /></div>
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
