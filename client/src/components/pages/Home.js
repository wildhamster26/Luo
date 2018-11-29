import React, { Component } from 'react'
import ItemCard from './partials/ItemCard'
import api from '../../api';
// import Axios from 'axios';
// import ItemDetail from './ItemDetail';


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    api.getItems()
    .then(items => {
      // console.log("HEY!", items)
        this.setState({
          items: items
        })
      })
  }
  render() {
    // this.state.items.length > 0 && console.log('NOTHING?', this.state.items[0].title)
    return (
      <div>
        <h1>Home!</h1>
        <div className="itemCards-container">
          {this.state.items.map(item => <ItemCard key={item._id} name={item.title} pictures={item.pictures } pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} />) }
        </div>
      </div>
    )
  }
}
