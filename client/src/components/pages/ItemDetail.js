import React, { Component } from 'react';
import Map from './partials/Map';
import api from '../../api';
import { Button } from 'reactstrap';



export default class ItemDetail extends Component {
  constructor(props){
    super(props)
    this.id = this.props.match.params.itemId
    this.state= {
      item: {}
    }
  }

  contactOwner = () => {
    
  }

  requestItem = () => {
    api.requestItem(this.state.item._id)
  }

  render() {
    
    console.log(this.state.item);

    if (!this.state.item._id) {
      return <div>Loading...</div>
    }
    return (
      <div className="item-detail">
        <h2>{this.state.item.name}</h2>

        <img src={this.state.item.picture} alt="The item"/>
        
        <h4>Description</h4>
        {this.state.item.description}

        <h4>Price per night</h4>
        {this.state.item.pricePerPeriod}€

        <h4>Owner</h4>
        <Button onClick={this.contactOwner}>Owner details</Button>
        <div className="item-detail-buttons">
          <Button>Availability</Button>
          <Button onClick={this.requestItem}>Request</Button>
        </div>

        <div className="item-detail-map"><Map coordinates={[this.state.item.location.coordinates]} /></div>
      </div>
    )
  }

  componentDidMount() {
    api.getItemById(this.id)
      .then(data => {
        console.log("item is:", data.item)
        this.setState({
            item: data.item
          })
        })
        .catch(err => console.log(err))
      }
    
}
