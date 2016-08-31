import React from 'react'
import classNames from 'classnames'
import AdminSelect from './AdminSelect'

class TopNav extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
     <div className="main-title-contianer"><i className="fa fa-database pokerchips"></i>
            <h1 className="main-title">Planning Pokerify</h1>
            <i className={classNames("fa fa-inbox inbox", {on:this.props.showMessagePanel})} onClick={this.props.toggleMessagePane.bind(this)}></i>
            
            <AdminSelect users={this.props.users} 
            toggleAdminPane={this.props.toggleAdminPane}
            show={this.props.showAdminPane}
            />

     </div>) 
  }
 
}

export default TopNav
