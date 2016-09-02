import React from "react";

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.nextTask = props.nextTask;
    this.prevTask = props.prevTask;
    this.toggleTimer = props.toggleTimer;
  }
  render() {
    const progressBar = (this.props.timer) ? ((1 - (this.props.timer / 30)) * 100) : 0;
    return (
      <div className="task-controls">
        <div className="task-control-buttons">
          <i onClick={this.prevTask} className="fa fa-step-backward back" />
          {!this.props.timerOn ? (<i onClick={this.toggleTimer} className="fa fa-play control play" />) :
           (<i onClick={this.toggleTimer} className="fa fa-pause control pause" />)}
          <i onClick={this.nextTask} className="fa fa-step-forward forward" />
        </div>
        <div className="time">{ `00:${((this.props.timer >= 10) ?
          this.props.timer : `0${this.props.timer}`)}`}</div>
        <div className="duration-bar-container">
          <div className="duration-bar-bg">
            <div
              className="duration-bar-forground"
              style={{
                width: `${progressBar}%`
              }}
            >
              <div className="duration-bar-marker" />
            </div>
          </div>
        </div>
      </div>);
  }
}

Controls.propTypes = {
  nextTask: React.PropTypes.func.isRequired,
  prevTask: React.PropTypes.func.isRequired,
  toggleTimer: React.PropTypes.bool.isRequired,
  timer: React.PropTypes.number.isRequired,
  timerOn: React.PropTypes.bool.isRequired
};

export default Controls;
