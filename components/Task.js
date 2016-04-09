import React from '../node_modules/react'
import classNames from 'classnames'

class Task extends React.Component {
   constructor (props) {
    super(props)
    this.selectTask = this.selectTask.bind(this)
  }
  render () {
     return (
       <div onClick={this.selectTask} key={this.props.index} 
           className={classNames("task", { "selected":  this.props.task.selected } )}  value="item"> 
          { this.props.task.selected ? <i className="fa fa-check-circle-o task-icon"> </i> : <i className="fa fa-circle-o task-icon"> </i> }
          {this.props.task.score ? "[" +this.props.task.score +"] ": null }
          {this.props.task.description}
      </div>
      )
  }
  
  selectTask(){
    const {selectTask, task, index } = this.props
    task.index = index;
    selectTask(task)
  }

  
  
 
}

export default Task
