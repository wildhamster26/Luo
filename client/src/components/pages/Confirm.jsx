import React, { Component } from 'react'
import api from '../../api';

export default class Confirm extends Component {
  render() {
    return (
      <div>
        Loading...
      </div>
    )
  }

  componentDidMount(){
    console.log(this.props.match.params.confirmationCode)
    api.sendConfirmation(this.props.match.params.confirmationCode)
    .then(res => {
      this.props.history.push("/");
    })
  }
}
