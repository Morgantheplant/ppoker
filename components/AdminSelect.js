import React from '../node_modules/react'
import classNames from 'classnames'

class AdminSelect extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
     return (
      <div className="admin-select">
        <div className="select">
          <i className="fa fa-users"></i>
          <span className="text">Select Admin</span><i className="nav-angle fa fa-angle-down" onClick={this.props.toggleAdminPane}></i></div>
        <div className={ classNames("drop-down", { "show": this.props.show }) }>  
          <div className="arrow"></div>
          <div className="admin-select-pane">
            
            {this.props.users.map(this._createUserSelection, this)}
          </div>
        </div>    
      </div>)
  }
  
  _createUserSelection(user, index){
    return <div key={index} className="user-select" value="user.name">{user.name}</div>
  }
 
}

export default AdminSelect
