import React, { Component } from 'react';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

class Map extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.map = null
    this.markers = []
  }
  initMap() {
    // Embed the map where "this.mapRef" is defined in the render
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: this.props.location, // Berlin lng,lat
      zoom: 13
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    for (let i = 0; i < 2; i++) {
      this.markers.push(
        new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(this.props.location)
                    .on('click', () => { console.log("clicked") })
                    .addTo(this.map)
      )
    }
  }
  handleItemSelection() {
    this.map.setCenter(this.props.location)
  }
  render() {
    return (
      <div ref={this.mapRef} className="map" style={{width:400, height: 400}}></div>
    );
  }
  componentDidMount() {
    this.initMap()
  }
}

export default Map; 
