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
      //console.log(res.data._id); <== Change the _id to "firstItemId" to find the ifrst item's id.
      this.props.history.push("/");
    })
  }
}
