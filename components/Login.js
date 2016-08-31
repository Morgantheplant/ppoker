import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
 
  constructor(props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
  }

  _onLoginSubmit() {
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
  }

  render() {
    const { authenticated } = this.props;
    if (authenticated) {
      return (
        <h1 className="">You are logged in amigo</h1>
      );
    }

    return (
      <div className="login-pane">
        <h1 className="">Email Login</h1>
        <fieldset className="login-container">
            <input className="email"
              type="email"
              ref="email"
              placeholder="email" />
            <input className="password"
              type="password"
              ref="password"
              placeholder="password" />
            <button className="user"
              onClick={this._onLoginSubmit}>Login</button>
        </fieldset>
        <h1 className="asana-login-container">Asana Login</h1>
        <fieldset className="login">
          <a className="asana-login"
            href="/auth/asana">Login with Asana</a>
        </fieldset>
      </div>
    );
  }
}


export default Login;

