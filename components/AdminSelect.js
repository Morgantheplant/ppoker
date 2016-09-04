import React from "react";
import classNames from "classnames";

class AdminSelect extends React.Component {
  createUserSelection(user, index) {
    return (<div key={index} className="user-select" value="user.name">{user.name}</div>);
  }
  render() {
    return (
      <div className="admin-select" >
        <div className={classNames("select", { show: this.props.show })}>
          <i className={classNames("fa fa-users", { show: this.props.show })} />
          <span className="text">Select Admin</span>
          <i className="nav-angle fa fa-angle-down" onClick={this.props.toggleAdminPane} />
        </div>
        <div className={classNames("drop-down", { show: this.props.show })}>
          <div className="arrow" />
          <div className="admin-select-pane">
            {this.props.users.map(this.createUserSelection, this)}
          </div>
        </div>
      </div>);
  }
}

AdminSelect.propTypes = {
  show: React.PropTypes.string.isRequired,
  toggleAdminPane: React.PropTypes.bool.isRequired,
  users: React.PropTypes.array.isRequired
};

export default AdminSelect;
