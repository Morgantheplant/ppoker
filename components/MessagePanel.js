import React from '../node_modules/react'
import moment from 'moment'

class MessagePanel extends React.Component {
   constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
  }

  render(){
    return (
      <div className="message-panel">
        <i className="fa fa-inbox message-button"></i>
        <div className="message-panel-container">
          <div className="message_area"><ul className="messages">{this.props.messages.map(this._createMessage, this)}</ul>
          </div>
          <div className="user-info">
            <div className="roomname"><i className="fa fa-home"></i> roomname: {this.props.roomname}</div>
            <div className="username"><i className="fa fa-user"></i> username: {this.props.userName}</div> 
            <div className="message-input">
              <i className="fa fa-commenting message-icon"></i>
              <input className="message-entry" ref="messageInput" placeholder="enter text here" ></input>
              <button onClick={this.sendMessage} >SEND</button>
            </div>
          </div>
        </div>
    </div>)
  }

  sendMessage(){
    if(this.refs.messageInput.value){
      const{sendMessage} = this.props;
      sendMessage(this.refs.messageInput);
    }
  }

  _createMessage(item, index){
     return <li key={index}><b>{item.name ? item.name +':' : ''}</b>&nbsp;{item.msg}<span className="time-stamp"> { moment().format('h:mm  a') } </span></li>
  }

 
}

export default MessagePanel
