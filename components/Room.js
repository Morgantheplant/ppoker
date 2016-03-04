import React from '../node_modules/react';
import socket  from '../socket';
import classNames from 'classnames';
import Cards from './Cards';
import { addRoomMessage, addUser, removeUser } from '../actions/home'
import { connect } from 'react-redux';

class Room extends React.Component {
   constructor () {
    super()
    this.state = { 
      messages: [],
      name: ''
    }
  }
  render () {
   let { roomname } = this.props.params
    return (
      <div>Hello. This is room: {roomname}
        <div>
          { this.state.name ? 'Your name is ' + this.state.name : (<span>Enter your name to join &nbsp;<input ref="nameentry" />
            <button onClick={this.updateName.bind(this)}>enter</button></span>) }
        </div>

        
        { this.state.name ? ( <div><textarea ref="textarea" ></textarea>
          <button onClick={this.sendMessage.bind(this)} >send</button></div>) : null }
        
        <ul>{this.props.messages.map(this._createMessage, this)}</ul>

        <ul>{this.props.users.map(this._createUsers, this)}</ul>
      
        <div className="card-area">
          <Cards />
        </div>

      </div>)
  }

  componentDidMount(){
    let { dispatch } = this.props
    socket.on('message', function(data){
        dispatch(addRoomMessage(data))
        if(data.joined){
           dispatch(addUser(data.joined))
        }
        if(data.left){
          dispatch(removeUser(data.left))
        }
    }.bind(this))
  }
  
  sendMessage(e){
    socket.emit('message',{
        name: this.state.name,
        msg: this.refs.textarea.value,
        room: this.props.params.roomname
    })
    this.refs.textarea.value = '';
  }

  updateName(e){
    console.log('updating name ', this.refs.nameentry )
    var name = this.refs.nameentry.value;
    this.setState({
      name: name
    })

    socket.emit('joinroom', {
      name: name,
      room: this.props.params.roomname
    })
  }

  _createMessage(item, index){
     return <li key={index}><b>{item.name ? item.name + ':' : ''}</b>&nbsp;{item.msg}</li>
  }

   _createUsers(item, index){
     return <li key={index}>{item.name}</li>
  }
 
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    users: state.users
  }
}


export default connect(mapStateToProps)(Room)   
