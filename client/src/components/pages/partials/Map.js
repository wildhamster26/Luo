import React, { Component } from 'react';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

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
      center: this.props.coordinates[0], // Berlin lng,lat
      zoom: 13
    })

    // Add zoom control on the top right corner
    this.map.addControl(new mapboxgl.NavigationControl())

    for (let i = 0; i < this.props.coordinates.length; i++) {
      this.markers.push(
        new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(this.props.coordinates[i])
                    .on('click', () => { console.log("clicked") })
                    .addTo(this.map)
      )
    }
  }
  handleItemSelection() {
    this.map.setCenter(this.props.coordinates[0])
  }
  render() {
    return (
      <div ref={this.mapRef} className="map" style={{height: 200}}></div>
    );
  }
  componentDidMount() {
    this.initMap()
  }
}

export default Map; 
