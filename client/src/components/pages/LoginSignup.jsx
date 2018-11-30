import React, { Component } from 'react';
import Signup from './partials/Signup';
import Login from './partials/Login';
import { Container } from 'reactstrap';



export default class LoginSignup extends Component {
  
  render() {
    return (
      <Container className="Login-signup-page">
        <Login/>
        <br/>
        <div className="or">
          <div className="inner-or">
            <hr/>OR<hr/>
          </div>
        </div>
        <br/>
        <Signup itemId={this.props.itemId}/>
      </Container>
    )
  }
}
