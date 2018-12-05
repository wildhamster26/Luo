import React, { Component } from 'react';
import ItemCard from './partials/ItemCard';
// import { NavLink, Route, Switch, Link } from 'react-router-dom'
import {
  Form,
  Input, 
  Button,
} from 'reactstrap'
// import ItemDetail from './ItemDetail'
import api from '../../api';


// import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      imgPath: "",
      file: null,
      id: "",
      items: [],
      rented: [],
      borrowed: [],
      initialUsername: null,
      initialEmail: null,
      message: null
    }
  }

  handleChange = (e) => {
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      email: this.state.email,
    }
    api.editUser(api.getUserSync()._id, data)
      .then(result => {
        console.log("result before USER image upload:", result)
        console.log("result before USER image upload:", this.state.file)
        if(this.state.file)
           return api.addUserPicture(this.state.file, result.data._id)
      })
      .then(result => {
        if(!!result.picture){
          console.log('SUCCESS!', result.picture)
          this.setState({
            imgPath: result.picture,
            message: `Yay!`
          })
        } else {
          this.setState({
            message: `Yay!`
          })
        }
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2500)
      })
      // .then(res => {
        // })
        .catch(err => this.setState({ message: err.toString() }))
  }

  // chooseFile() {
  //   let input = document.getElementById("fileInput");
  // }
  
  render() {
      return (
        <div className="profile-page">
          <h1>My Profile</h1>
          <div className="profile-form-div">
              <Form>
                    <Input disabled value={this.state.email} />
                    <Input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                    <div className="user-img">
                      {/* <button onClick={this.chooseFile}> */}
                        <img src={this.state.imgPath} width="100px" alt="User avatar"/>
                        {/* </button> */}
                      {/* <div className="file-input"> */}
                        <input type="file" id="fileInput" name="fileInput" onChange={this.handleChange} />
                      {/* </div> */}
                    </div>
                    {(this.state.file || this.state.initialUsername !== this.state.username || this.state.initialEmail !== this.state.email) &&
                    <div className="user-button">
                      <Button color="primary" onClick={(e) => this.handleClick(e)}>Edit</Button>
                    </div>}
         
                    {this.state.message && <div className="info">
                      {this.state.message}
                    </div>}
              </Form>
          </div>
          {(this.state.items.length !== 0) && <h2 className="profile-items-h2">All my items:</h2>}
          {(this.state.items.length === 0) && <h6 className="profile-items-h2">I have not added any items... yet.</h6>}
          <div className="itemCards-container">
            {this.state.items.map(item => <ItemCard key={item._id} name={item.name} owner={item._owner}  id={item._id} imgPath={item.imgPath} pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} searchFilter="" categoryFilter={[]} categories={[]}/>)}
          </div>
          {(this.state.rented.length !== 0) && <h2 className="profile-items-h2">Rented items:</h2>}
          {(this.state.rented.length === 0) && <h6 className="profile-items-h2">No rented items.</h6>}
          <div className="itemCards-container">
            {this.state.rented.map(item => <ItemCard key={item._id} name={item.name} owner={item._owner}  id={item._id} imgPath={item.imgPath} pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} searchFilter="" categoryFilter={[]} categories={[]}/>)}
          </div>
          {(this.state.borrowed.length !== 0) && <h2 className="profile-items-h2">Borrowed items:</h2>}
          {(this.state.borrowed.length === 0) && <h6 className="profile-items-h2">No borrowed items.</h6>}
          <div className="itemCards-container">
            {this.state.borrowed.map(item => <ItemCard key={item._id} name={item.name} owner={item._owner}  id={item._id} imgPath={item.imgPath} pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} searchFilter="" categoryFilter={[]} categories={[]}/>)}
          </div>
        </div>
      );
  }
  
  componentDidMount() {
    if(api.isLoggedIn()){
    Promise.all([api.getProfile(), api.getItems(), api.getRequests()])
    .then(res => {
      this.setState({
        username: res[0].username,
        initialUsername: res[0].username,
        email: res[0].email,
        initialEmail: res[0].email,
        imgPath: res[0].imgPath,
        id: res[0]._id,
        items: res[1].filter(item => {
          return item._owner._id === res[0]._id
        }),
        // iterate through all the items and return the relevant ones
        rented: res[1].filter((item, i) => {
          let relevantItem = false;
          //if the item appears in a request, keep going
          for(let i = 0; i < res[2].length; i++){
            if (item._id === res[2][i]._item && 
              // if that request's renter is equal to the user => return true
              res[2][i]._owner === res[0]._id) 
              relevantItem = true 
          }
          return relevantItem;
        }),
        borrowed: res[1].filter((item, i) => {
          let relevantItem = false;
          //if the item appears in a request, keep going
          for(let i = 0; i < res[2].length; i++){
            if (item._id === res[2][i]._item && 
              // if that request's borrower is equal to the user => return true
              res[2][i]._borrower === res[0]._id) 
              relevantItem = true 
          }
          return relevantItem;
        }),
      })      
    })
    .catch(err => console.log(err))
   }
  }
}

export default Profile;



   