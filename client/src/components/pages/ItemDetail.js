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
    .then(res =>{
      alert("The owner has been contacted with your email.");
    });
  }

  render() {
    
    console.log(this.state.item);

    if (!this.state.item._id) {
      return <div>Loading...</div>
    }

    if (this.state.item.imgPath === undefined || this.state.item.imgPath.length === 0) 
      this.state.item.imgPath = 'https://res.cloudinary.com/wildhamster26/image/upload/v1543699130/folder-name/generic.png'

    return (
      <div className="item-detail">
        <h2>{this.state.item.name}</h2>

        <img src={this.state.item.imgPath} alt="The item"/>
        
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
