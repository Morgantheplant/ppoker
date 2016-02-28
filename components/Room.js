import React from '../node_modules/react';
import socket from '../socket';
import classNames from 'classNames';
import Cards from './Cards';


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
    return (<div>Hello. This is room: {roomname}
        <div>
          { this.state.name ? 'Your name is ' + this.state.name : (<span>Enter your name to join &nbsp;<input ref="nameentry" />
           <button onClick={this.updateName.bind(this)}>enter</button></span>) }
        </div>
        <div className="card-area">
          <Cards />
        </div>
        <textarea ref="textarea" ></textarea>
        <button onClick={this.sendMessage.bind(this)} >send</button>
        <ul>{this.state.messages.map(this._createMessage, this)}</ul>
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
