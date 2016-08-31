import React from 'react'

class Controls extends React.Component {
   constructor (props) {
    super(props)
    this.nextTask = props.nextTask;
    this.prevTask = props.prevTask;
    this.toggleTimer = props.toggleTimer;
  }
  render () {
   let progressBar = (this.props.timer) ? ((1 - (this.props.timer / 30))*100) : 0;
   return (
      <div className="task-controls">
        <div className="task-control-buttons">
          <i onClick={this.prevTask} className="fa fa-step-backward back"></i>
          { !this.props.timerOn ? (<i onClick={this.toggleTimer} className="fa fa-play control play" ></i>) : (
              <i onClick={this.toggleTimer} className="fa fa-pause control pause" ></i>
            ) }
          <i onClick={this.nextTask} className="fa fa-step-forward forward"></i>
        </div>
        <div className="time">{ "00:" + ((this.props.timer >= 10) ? this.props.timer : ("0" + this.props.timer)) }</div>
        <div className="duration-bar-container">
          <div className="duration-bar-bg">
            <div className="duration-bar-forground" style={
              {
                width: progressBar + "%"
              }
            }>
              <div className="duration-bar-marker">
              </div>
            </div>
          </div>
        </div>  
      </div>)
  }
}  

export default Controls
