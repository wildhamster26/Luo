import React, { Component } from 'react'
import ItemCard from './partials/ItemCard'
import api from '../../api';
import ReactModal from 'react-modal';
import SearchBox from './partials/SearchBox';
// import Calendar from 'react-calendar'
// import Axios from 'axios';
// import ItemDetail from './ItemDetail';


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      search: "",
      date: new Date(),
      activeCategories: [],
      pickedDates: []
    }

  }
  searchState = (character) => {
    this.setState({
      search: character
    })
    // console.log(this.state.search)
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
  onSubmitDates = () => {

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
    // this.state.items.length > 0 && console.log('NOTHING?', this.state.items[0].name)
    return (
      <div>
        <ReactModal isOpen={this.state.isOpen} />
      <div className="home">
        <div className="search-box-div">
          <SearchBox placeholder="" searchString={this.state.search} onSearch={this.searchState} />
        </div>
        <section className="categories-section">
          <div>
            <h3>Explore by category</h3>
          </div>
          <div className="categories-container">
            <a className={"category-button" + (this.state.activeCategories.includes('bikes') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('bikes')}>
              <div>
                <img alt="item" src="/images/categories/bicycle (white).png" />
                <p>Bikes</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('books') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('books')}>
              <div>
                <img src="/images/categories/book (white).png" alt="item"/>
                <p>Books</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('clothes') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('clothes')}>
              <div>
                <img src="/images/categories/clothes.png" alt="item"/>
                <p>Clothes</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('computers') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('computers')}>
              <div>
                <img alt="item" src="/images/categories/computer (white).png" />
                <p>Computers</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('gardening') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('gardening')}>
              <div>
                <img src="/images/categories/gardening (white).png" alt="item"/>
                <p>Gardening</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('kitchen') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('kitchen')}>
              <div>
                <img src="/images/categories/kitchen (white).png" alt="item"/>
                <p>Kitchen</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('sports') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('sports')}>
              <div>
                <img src="/images/categories/weightlifting (white).png" alt="item"/>
                <p>Sports</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('tools') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('tools')}>
              <div>
                <img src="/images/categories/tools (white).png" alt="item"/>
                <p>Tools</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('toys') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('toys')}>
              <div>
                <img src="/images/categories/toys (white).png" alt="item"/>
                <p>Toys</p>
              </div>
            </a>
            <a className={"category-button" + (this.state.activeCategories.includes('others') ? " isActive" : "")} href="/" onClick={()=>this.handleCategory('others')}>
              <div>
                <img src="/images/categories/others (white).png" alt="item"/>
                <p>Others</p>
              </div>
            </a>
          </div>
        </section>
        <div className="itemCards-container">
          {this.state.items.map(item => <ItemCard key={item._id} id={item._id} name={item.name} imgPath={item.imgPath} pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} searchFilter={this.state.search} categories={item.categories} categoryFilter={this.state.activeCategories} reservedDates={item.reservedDates} date={this.state.date} />) }
        </div>
      </div>
      </div>
    )
  }

}
