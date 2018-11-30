import React, { Component } from 'react'
import ItemCard from './partials/ItemCard'
import api from '../../api';
import { Container } from 'reactstrap';
import ReactModal from 'react-modal';

import SearchBox from './partials/SearchBox';
// import Axios from 'axios';
// import ItemDetail from './ItemDetail';


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      search: "",
      activeCategories: []
    }

  }
  searchState = (character) => {
    this.setState({
      search: character
    })
  }
  handleCategory = (category) => {
    let cats = this.state.activeCategories
    if (cats.indexOf(category.toLowerCase()) === -1) {
      cats.push(category.toLowerCase())
    } else {
      cats.splice(cats.indexOf(category.toLowerCase()), 1)
    }
    this.setState({
      activeCategories: cats
    })
  }
  componentDidMount() {
    api.getItems()
    .then(items => {
        this.setState({
          items: items
        })
      })
  }

  render() {
    return (
      <div>
        <ReactModal isOpen={this.state.isOpen} />
      <div className="home">
        <div className="search-box-div">
          <SearchBox placeholder="What are you looking for?" onSearch={this.searchState} />
        </div>
        <section className="categories-section">
          <div>
            <h3>Explore by category</h3>
          </div>
          <div className="categories-container">
            <a className={"category-button" + (this.state.activeCategories.includes('tools') ? " isActive" : "")} href="#" onClick={()=>this.handleCategory('tools')}>
              <div>
                <img src="/images/categories/tools (white).png" />
                <p>Tools</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('bikes') ? " isActive" : "")} href="#" onClick={()=>this.handleCategory('bikes')}>
              <div>
                <img src="/images/categories/bicycle (white).png" />
                <p>Bikes</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('clothes') ? " isActive" : "")} href="#" onClick={()=>this.handleCategory('clothes')}>
              <div>
                <img src="/images/categories/clothes.png" />
                <p>Clothes</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('sports') ? " isActive" : "")} href="#" onClick={()=>this.handleCategory('sports')}>
              <div>
                <img src="/images/categories/weightlifting (white).png" />
                <p>Sports</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('computers') ? " isActive" : "")} href="#" onClick={()=>this.handleCategory('computers')}>
              <div>
                <img src="/images/categories/computer (white).png" />
                <p>Computers</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('kitchen') ? " isActive" : "")} href="#" onClick={()=>this.handleCategory('kitchen')}>
              <div>
                <img src="/images/categories/kitchen (white).png" />
                <p>Kitchen</p>
              </div>
            </a>
          </div>
        </section>
        <div className="itemCards-container">
          {this.state.items.map(item => <ItemCard key={item._id} id={item._id} name={item.title} pictures={item.pictures } pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} searchFilter={this.state.search} categories={item.categories} categoryFilter={this.state.activeCategories} />) }
        </div>
      </div>
      </div>
    )
  }

}
