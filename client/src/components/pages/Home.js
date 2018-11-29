import React, { Component } from 'react'
import ItemCard from './partials/ItemCard'
import api from '../../api';
import SearchBox from './partials/SearchBox';
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
      <div className="home">
        <div>
          <SearchBox placeholder="What are you looking for?" />
        </div>
        <section className="categories-section">
          <div>
            <h3>Explore by category</h3>
          </div>
          <div className="categories-container">
            <a className="category-button" href="#">
              <div>
                <img src="/images/categories/tools (white).png" />
                <p>Tools</p>
              </div>
            </a>
            <a className="category-button" href="#">
              <div>
                <img src="/images/categories/bicycle (white).png" />
                <p>Bikes</p>
              </div>
            </a>
            <a className="category-button" href="#">
              <div>
                <img src="/images/categories/clothes.png" />
                <p>Clothes</p>
              </div>
            </a>
            <a className="category-button" href="#">
              <div>
                <img src="/images/categories/weightlifting (white).png" />
                <p>Sports</p>
              </div>
            </a>
            <a className="category-button" href="#">
              <div>
                <img src="/images/categories/computer (white).png" />
                <p>Computers</p>
              </div>
            </a>
            <a className="category-button" href="#">
              <div>
                <img src="/images/categories/kitchen (white).png" />
                <p>Kitchen</p>
              </div>
            </a>
          </div>
        </section>
        <div className="itemCards-container">
          {this.state.items.map(item => <ItemCard key={item._id} name={item.title} pictures={item.pictures } pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} />) }
        </div>
      </div>
    )
  }
}
