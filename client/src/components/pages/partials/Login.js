import React, { Component } from 'react';
import api from '../../../api';
import { withRouter } from "react-router";
// import { Input, Button, Container } from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.onLoginSignup()
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      // <div className="LoginOld">
      <div className="login-general-wrapper">
        <h2>Login</h2>
        <form className="Login-form">
           <input className="text-input" placeholder="Email" type="text" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} />
           <input className="text-input" placeholder="Password" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} />
           <div>
            <button color="primary" className="btn-second btn-login-signup" onClick={(e) => this.handleClick(e)}>Login</button>
           </div>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default  withRouter(Login);
