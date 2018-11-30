import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom'
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap'
import ItemDetail from './ItemDetail'
import api from '../../api';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

class Items extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.mapRef = React.createRef()
    this.map = null
    this.markers = []
  }
  initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [0, 0], // Africa lng,lat
      zoom: 15
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())
  }
  handleItemSelection(iSelected) {
    this.map.setCenter(this.state.items[iSelected].location.coordinates)
  }
  render() {
    return (
      <div className="Items">
      
        <Row>
          <h1>Hi</h1>
          {/* <Col sm={3} className="col-text">
            <ListGroup>
              {this.state.items.map((h, i) => (
                <ListGroupItem key={h._id} action tag={NavLink} to={"/items/" + h._id} onClick={() => this.handleItemSelection(i)}>
                  {h.name} by {h._owner.email}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col> */}
          {/* <Col sm={5} className="col-text">
            <Switch>
              <Route path="/items/:id" render={(props) => <ItemDetail {...props} items={this.state.items} />} />
              <Route render={() => <h2>Select an item</h2>} />
            </Switch>
          </Col> */}
          {/* <Col sm={7}>
            <div ref={this.mapRef} className="map"></div>
           </Col> */}
        </Row>
        
      </div>
    );
  }
  // componentDidMount() {
  //   api.getItems()
  //     .then(items => {
  //       // console.log('here', items)
  //       this.setState({
  //         items: items.map(item => {
  //           const [lng, lat] = item.location.coordinates
  //           return {
  //             ...item,
  //             marker: new mapboxgl.Marker({ color: 'red' })
  //               .setLngLat([lng, lat])
  //               .on('click', () => { console.log("clicked") })
  //               .addTo(this.map)
  //           }
  //         })
  //       })
  //     })
  //     .catch(err => console.log(err))
  //   this.initMap()

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     let center = [position.coords.longitude,position.coords.latitude]
    //     this.map.setCenter(center)
    //   })
    // }
  // }
}

export default Items;
