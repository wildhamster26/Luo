import React, { Component } from 'react'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
  }
  render() {
    return (
      <div className="search-box">
        <div>
          <form>
            <input type="text" placeholder={this.props.placeholder}></input>
          </form>
        </div>
      </div>
    )
  }
}