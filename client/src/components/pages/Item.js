import React, { Component } from 'react';

class Item extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                
    return (
      <div className="Item">
        <h2>Item</h2>
        <p>This is a sample project with the MERN stack</p>
        <button className="btn btn-primary">Hello</button>
      </div>
    );
  }
}

export default Item;
