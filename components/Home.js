import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router";
import * as actions from "../actions/home";
import socket from "../socket";
import MessagePane from "./MessagePane";
import NotificationPanel from "./NotificationPanel";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.updateRoomname = this.updateRoomname.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.submitRoomname = this.submitRoomname.bind(this);
    this.toggleBgColor = this.toggleBgColor.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
    this.toggleMessage = this.toggleMessage.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    socket.on("room-available", function roomAvail(name) {
      dispatch(actions.updateLink(`${location.href}${name}`));
      dispatch(actions.updateMessage(`Roomname "${name}" picked`));
      if (name !== this.props.roomName) {
        dispatch(actions.updateRoomName(name));
      }
      this.refs.roomLinkInput.value = `${window.location.href}room/${name}`;
    }.bind(this));

    socket.on("room-not-available", function roomNotAvail() {
      this.notifyMessage("Sorry that room already exists");
    }.bind(this));

    dispatch(actions.updateMessage("Please enter a roomname"));
  }
  updateRoomname(e) {
    const { dispatch } = this.props;
    dispatch(actions.updateRoomName(e.target.value));
  }
  updatePassword(e) {
    const { dispatch } = this.props;
    dispatch(actions.updatePassword(e.target.value));
  }
  submitRoomname() {
    const clean = this.props.roomName.replace(/\W+|\s/g, "");
    socket.emit("roomname", clean);
    this.toggleBgColor();
  }
  toggleBgColor() {
    const { dispatch } = this.props;
    dispatch(actions.toggleBgColor());
  }
  togglePrivate() {
    const { dispatch } = this.props;
    dispatch(actions.togglePrivate());
  }

  notifyMessage(message) {
    const { dispatch } = this.props;
    dispatch(actions.notificationMessage(message));
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.hideNofity(dispatch);
    } else {
      this.hideNofity(dispatch);
    }
  }

  hideNofity(dispatch) {
    this.timeout = setTimeout(function hideNofity() {
      dispatch(actions.hideNotification());
      this.timeout = null;
    }.bind(this), 2000);
  }

  toggleMessage() {
    const { dispatch } = this.props;
    dispatch(actions.toggleAsanaMessage());
  }
  render() {
    return (
      <div className="main-bg">

        <NotificationPanel
          message={this.props.notification}
          show={this.props.notificationShow}
        />

        <div className={classNames("intro-modal", { inverse: this.props.bgColor })} >

          <div className="login-container">

            <div className="intro-title"><i className="fa fa-database pokerchips" />
              <div className="title-container">
                <h1 className="main-title">Planning</h1>
                <h1 className="main-title">Pokerify</h1>
              </div>
            </div>

            <button className="asana-button" onClick={this.toggleMessage}>LOG IN WITH ASANA</button>

            <div className="or-contianer">
              <div className="or-line-left" />
              <div className="or">OR</div>
              <div className="or-line-right" />
            </div>

            <input
              type="text"
              ref="roomNameInput"
              className="room-name-input"
              onChange={this.updateRoomname}
              placeholder="enter a roomname"
            />

            <input
              type="text"
              ref="roomPasswordInput"
              className={classNames("room-name-input password", { "password-on": this.props.usePass })}
              onChange={this.updatePassword}
              placeholder="enter a password"
            />

            <div className={classNames("private-option", { "private-on": this.props.usePass })}>
              <div>
                <div classNames="private-text">MAKE PRIVATE</div>
                <div
                  onClick={this.togglePrivate}
                  className={classNames("toggleTrack", { "password-on": this.props.usePass })}
                >
                  <div className="toggleThumb" />
                </div>
              </div>
            </div>

            {
            // show or hide link button
            this.props.link ? (
              <Link className="room-link" to={`/room/${this.props.roomName}`} >
                <button className="btn roomname"> ENTER ROOM </button>
              </Link>) : <button className="btn roomname" onClick={this.submitRoomname} > CREATE </button>
          }
            <p className="link-text" >LINK TO ROOM:</p>
          {
            // show or hide link field
            this.props.link ? (<input ref="roomLinkInput" className="room-link-input" />) : null
          }
          </div>
        </div>

        {(this.props.toggleAsanaMessage ? <MessagePane
          toggleMessage={this.toggleMessage}
          content="Sorry, this feature is still under construction..."
        /> : null)}

      </div>);
  }

}

Home.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  roomName: React.PropTypes.string.isRequired,
  notification: React.PropTypes.object.isRequired,
  notificationShow: React.PropTypes.bool.isRequired,
  bgColor: React.PropTypes.string.isRequired,
  usePass: React.PropTypes.bool.isRequired,
  link: React.PropTypes.string.isRequired,
  toggleAsanaMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    roomName: state.homeStore.roomName,
    userName: state.homeStore.userName,
    link: state.homeStore.link,
    bgColor: state.homeStore.bgColor,
    usePass: state.homeStore.usePass,
    notification: state.notificationStore.notification,
    notificationShow: state.notificationStore.show,
    toggleAsanaMessage: state.homeStore.toggleAsanaMessage
  };
}

export default connect(mapStateToProps)(Home);
