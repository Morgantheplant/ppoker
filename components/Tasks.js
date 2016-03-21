import React from '../node_modules/react'

class Tasks extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
     return (
      <div>
        <input /><i className="fa fa-plus add-task"></i>
        {this.props.tasks.map(this._createTasks, this)} 
      </div>)
  }
  
  _createTasks(item, index){
    return <div key={index} className="task" value="item">{item}</div>
  }
 
}

export default Tasks
