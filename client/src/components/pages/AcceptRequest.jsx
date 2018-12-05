import React, { Component } from 'react'
import api from '../../api';

export default class AcceptRequest extends Component {
  render() {
    return (
      <div>
        You have accepted the request
      </div>
    )
  }

  componentDidMount(){
    // console.log(this.props.match.params.requestId)
    api.acceptRequest(this.props.match.params.requestId)
    .then(res => res.data)
    .catch(err => console.log(err))
  }
}
