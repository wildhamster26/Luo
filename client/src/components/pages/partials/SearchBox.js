import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
  }
  changeSearchBar(e){
    // console.log('HEYA!', e.target.value.toLowerCase())
    this.props.onSearch(e.target.value.toLowerCase());
  }
  render() {
    // console.log(this.props.searchString)
    return (
      <div className="search-box">
        <form>
          <input className={this.props.searchString !== "" && "active-input"} type="text" name="search" placeholder={this.props.placeholder} onChange={(e) => this.changeSearchBar(e)}></input>
        </form>
      </div>
    )
  }
}