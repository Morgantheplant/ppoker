import React from '../node_modules/react'

class MessagePane extends React.Component {
   constructor (props) {
    super(props)
    this.togglePane = this.togglePane.bind(this)
  }
  render () {
    return (
      <div id="modal-bg" >
        <div id="modal" className="asana_error_message">
          <div className="close" onClick={ this.props.toggleMessage }>x</div>
          <div id="modal-content">
            { this.props.content }
          </div>  
        </div>
      </div>) 
  }
  togglePane(){
    const {toggleMessage} = this.props
    debugger
    toggleMessage()
  }
 
}

export default MessagePane
