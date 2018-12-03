import React, { Component } from 'react'
import ItemCard from './partials/ItemCard'
import api from '../../api';
import ReactModal from 'react-modal';
import SearchBox from './partials/SearchBox';
import { Link } from 'react-router-dom' // Be careful, NavLink is already exported from 'reactstrap'
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
  onSubmitDates = () => {

  }

  updateDeleteItem = () => {
    api.getItems()
    .then(items => {
        this.setState({
          items: items
        })
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
          <SearchBox placeholder="" searchString={this.state.search} onSearch={this.searchState} />
        </div>
        <section className="categories-section">
          <div>
            <h3>Explore by category</h3>
          </div>
          <div className="categories-container">
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('bikes') ? " isActive" : "")} onClick={()=>this.handleCategory('bikes')}>
              <div>
                <img alt="item" src="/images/categories/bicycle (white).png" />
                <p>Bikes</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('books') ? " isActive" : "")} onClick={()=>this.handleCategory('books')}>
              <div>
                <img src="/images/categories/book (white).png" alt="item"/>
                <p>Books</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('clothes') ? " isActive" : "")} onClick={()=>this.handleCategory('clothes')}>
              <div>
                <img src="/images/categories/clothes.png" alt="item"/>
                <p>Clothes</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('computers') ? " isActive" : "")} onClick={()=>this.handleCategory('computers')}>
              <div>
                <img alt="item" src="/images/categories/computer (white).png" />
                <p>Computers</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('gardening') ? " isActive" : "")} onClick={()=>this.handleCategory('gardening')}>
              <div>
                <img src="/images/categories/gardening (white).png" alt="item"/>
                <p>Gardening</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('kitchen') ? " isActive" : "")} onClick={()=>this.handleCategory('kitchen')}>
              <div>
                <img src="/images/categories/kitchen (white).png" alt="item"/>
                <p>Kitchen</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('sports') ? " isActive" : "")} onClick={()=>this.handleCategory('sports')}>
              <div>
                <img src="/images/categories/weightlifting (white).png" alt="item"/>
                <p>Sports</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('tools') ? " isActive" : "")} onClick={()=>this.handleCategory('tools')}>
              <div>
                <img src="/images/categories/tools (white).png" alt="item"/>
                <p>Tools</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('toys') ? " isActive" : "")} onClick={()=>this.handleCategory('toys')}>
              <div>
                <img src="/images/categories/toys (white).png" alt="item"/>
                <p>Toys</p>
              </div>
            </Link>
            <Link to={"/"} className={"category-button" + (this.state.activeCategories.includes('others') ? " isActive" : "")} onClick={()=>this.handleCategory('others')}>
              <div>
                <img src="/images/categories/others (white).png" alt="item"/>
                <p>Others</p>
              </div>
            </Link>
          </div>
        </section>
        <div className="itemCards-container">
          {this.state.items.map(item => <ItemCard key={item._id} id={item._id} owner={item._owner} name={item.name} imgPath={item.imgPath} pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} searchFilter={this.state.search} categories={item.categories} categoryFilter={this.state.activeCategories} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} />) }
        </div>
      </div>
      </div>
    )
  }

}
