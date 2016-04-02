import React from '../node_modules/react'
import Task from './Task'

class Tasks extends React.Component {
   constructor (props) {
    super(props)
    this.addTask = this.addTask.bind(this);
    this.nextTask = props.nextTask;
    this.prevTask = props.prevTask;
    this.toggleTimer = props.toggleTimer;
  }
  render () {
     return (
      <div>
        <div className="task-controls">
        <div className="time">{this.props.timer}</div>
          <i onClick={this.prevTask} className="fa fa-step-backward back"></i>
          { !this.props.timerOn ? (<i onClick={this.toggleTimer} className="fa fa-play control play" ></i>) : (
              <i onClick={this.toggleTimer} className="fa fa-pause control pause" ></i>
            ) }
          <i onClick={this.nextTask} className="fa fa-step-forward forward"></i>
          <div className="detail">description</div>
        </div> 
        <input ref="taskInput" /><i className="fa fa-plus add-task" onClick={this.addTask}></i>
        {this.props.tasks.map(this._createTasks, this)}
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
