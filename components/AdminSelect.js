import React from '../node_modules/react'

class AdminSelect extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
     return (
      <div className="admin-select">
        <div className="select"><i className="fa fa-users"></i><div>Select Admin</div><i className="nav-angle fa fa-angle-down"></i></div>
        <div className="arrow"></div>
        <div className="admin-select-pane">
          
          {this.props.users.map(this._createUserSelection, this)}
        </div>  
      </div>)
  }
  
  _createUserSelection(user, index){
    return <div key={index} className="user-select" value="user.name">{user.name}</div>
  }
 
}

export default AdminSelect
