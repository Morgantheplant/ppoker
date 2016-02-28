import React from '../node_modules/react'
import socket from '../socket'
import classNames from 'classNames'

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
    return (<div>Hello. You are attempting to join room: {roomname}
        <div>Your name is &nbsp;
          { this.state.name ? this.state.name : (<span><input ref="nameentry" />
           <button onClick={this.updateName.bind(this)}>enter</button></span>) }
        </div>
        <textarea ref="textarea" ></textarea>
        <button onClick={this.sendMessage.bind(this)} >send</button>
        <ul>{this.state.messages.map(this._createMessage.bind(this))}</ul>
        </div>)
  }

  componentDidMount(){
    socket.on('message', function(data){
        this.setState({
          'messages': this.state.messages.concat(data)
        })
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
 
}

export default Room
