import React from '../node_modules/react'

class Tasks extends React.Component {
   constructor (props) {
    super(props)
    this.addTask = this.addTask.bind(this);
  }
  render () {
     return (
      <div>
        <input ref="taskInput" /><i className="fa fa-plus add-task" onClick={this.addTask}></i>
        {this.props.tasks.map(this._createTasks, this)} 
      </div>)
  }
  
  _createTasks(item, index){
    debugger
    return <div key={index} className="task" value="item">{item.description}</div>
  }

  addTask(){
    let input = this.refs.taskInput
    if(input.value != ""){
      const {addTask} = this.props
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
