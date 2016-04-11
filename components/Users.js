import React from '../node_modules/react'
import classNames from 'classnames'

//let loteria = `loteria-card-${Math.ceil(Math.random()*25)}.jpg`;

class Users extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
     <div className="users-container"> 
        { this.props.selectedTask.score ? (<div className="final-score">
          {`Final Score: ${this.props.selectedTask.score}`}</div>) : null
        }
        <ul className="users">
          {this.props.users.map(this._createUsers, this)} 
        </ul>
     </div>   
        ) 
  }

  _createUsers(item, index){
    return (
    <li className="user" key={index}>
      <div className={classNames("flip", {show: this.props.showResults}) } 
           style={ {transition: `0.6s ${ 0.25 * index}s transform`} } >
        <div className="front-card" style={
          { backgroundImage: `url("../public/images/cards/loteria-card-${item.num}.jpg")` }
        }>
        </div>
        <div className={ `back-card ${index%2?'odd':'even'}` }>
          <div className="top">{item.pick}</div>
          <div className="middle">{item.pick}</div>
          <div className="bottom">{item.pick}</div>
        </div> 
      </div>
      <div className="username">{item.name}</div>  
    </li>)
  }

 
}

export default Users
