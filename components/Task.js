import React from '../node_modules/react'

class Task extends React.Component {
   constructor (props) {
    super(props)
    this.selectTask = this.selectTask.bind(this)
  }
  render () {
     return (
       <div onClick={this.selectTask} key={this.props.index} className="task" value="item"> {this.props.task.description}
          { this.props.task.selected ? <i className="fa fa-dot-circle-o"></i> : <i className="fa fa-circle-o"></i> }
          {this.props.score ? "score: " +this.props.score : null }
      </div>
      )
  }
  
  selectTask(){
    const {selectTask, task, index } = this.props
    task.selected = true;
    task.index = index;
    selectTask(task)
  }

  
  
 
}

export default Task
