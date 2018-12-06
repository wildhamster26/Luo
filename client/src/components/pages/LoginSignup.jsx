import React, { Component } from 'react';
import Signup from './partials/Signup';
import Login from './partials/Login';
// import { Container } from 'reactstrap';



export default class LoginSignup extends Component {
  // console.log(this.props.itemId)
  render() {
    return (
      <div className="Login-signup-page">
          <Login onLoginSignup={this.props.onLoginSignup} />
          <div className="or">
            <div className="inner-or">
              <hr/>OR<hr/>
            </div>
          </div>
          <Signup />
      </div>
    )
  }
}
