import React from 'react'
import classNames from 'classnames'

class NotificationPanel extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (<div className={classNames("notification-panel", { "show": this.props.show }) } >
      <i className="fa fa-flag icon"></i><span className="message">{this.props.message}</span><i className="fa fa-close x"></i>
      </div>)
  }

  componentWillReceiveProps(props){
    if(props.message){
      this.setState({
        show:true
      });

      setTimeout(function(){
            this.setState({
                show:false
            })
        }.bind(this), 3000);
    }

  }

}  

  
export default NotificationPanel   


