import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class ItemDetail extends Component {
  render() {
    let curId = this.props.match.params.id
    let curItem = this.props.items.find(item => item._id === curId)

    if (!curItem) {
      return <div />
    }

    return (
      <div>
        <h2>{curItem.title}</h2>
        
        <h4>Description</h4>
        {curItem.description}

        <h4>Price per night</h4>
        {curItem.pricePerPeriod}€

        <h4>Owner</h4>
        {curItem._owner.email}
      </div>
    )
  }
}
