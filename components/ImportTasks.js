import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux';
import { toggleProjectPane, addAsanaToken,removeAsanaToken,
addAsanaProjects } from '../actions/home'

class ImportTasks extends React.Component {
   constructor (props) {
    super(props)
    this.togglePane = this.togglePane.bind(this);
    this.importTasks = this.importTasks.bind(this);
  }
  render () {
     return (
        <div className="import-tasks">
          <div className="toggle" onClick={this.togglePane} ><i className="fa fa-sign-in icon" ></i>Import tasks</div>
          <div className={ classNames("import-pane", { "show": this.props.showPane }) }>  
            <div className="arrow"></div>
            <div className="project-select-pane">
              <h2 className="heading">Select Project <i className="fa fa-refresh icon" onClick={this.importTasks} ></i></h2>
              {this.props.projects.map(this._createProjectSelection, this)}
            </div>
          </div>    
        </div>)
  }
  
  _createProjectSelection(project, index){
    return <div key={index} className="project-select" value="user">{project.name}</div>
  }

  importTasks(){
    let { dispatch } = this.props;
    if(this.props.isLoggedIn){
      $.ajax({
        url: "/projects",
        data: {
          roomname:this.props.roomname,
          token: this.props.token
        },
        method: "GET",
      }).done(function(projects) {
        dispatch(addAsanaProjects(projects));
      });
    } else {
      this.asanaAuth()
    }
  }

  togglePane(){
    let { dispatch } = this.props;
    dispatch(toggleProjectPane())
    if(!this.props.projects.length){
      this.importTasks();
    }
  }
  asanaAuth(){

  }
 
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.importTaskStore.isLoggedIn, 
    token: state.importTaskStore.token,
    showPane: state.importTaskStore.showPane,
    projects: state.importTaskStore.projects
  }
}
export default connect(mapStateToProps)(ImportTasks)
