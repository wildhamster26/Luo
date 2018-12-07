import React, { Component } from 'react';
import ItemCard from './partials/ItemCard';
// import { NavLink, Route, Switch, Link } from 'react-router-dom'
import {
  Form,
  Input, 
  // Button,
} from 'reactstrap'
// import ItemDetail from './ItemDetail'
import api from '../../api';


// import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // username: "",
      // email: "",
      // imgPath: "",
      file: null,
      // id: "",
      items: [],
      rented: [],
      borrowed: [],
      // initialUsername: null,
      // initialEmail: null,
      message: null,
      user: this.props.user
    }
  }

  handleChange = (e) => {
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }

  handleUserInputChange = (event) => {
    // let user = {
    //   ...this.state.user,
    //   [event.target.name]: event.target.value
    // }
    // this.props.onUserChange(user)
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  }

  handleEdit(e) {
    e.preventDefault()
    let data = {
      username: this.state.user.username,
      email: this.state.user.email,
    }
    if(this.state.file){
      api.addUserPicture(this.state.file,this.state.user._id)
      .then(result => 
        this.setState({
          user: {
            ...this.state.user,
            imgPath: result.picture
          },
          message: `Updated! Yay!`
        }, () => {
          this.props.onUserChange(this.state.user)
        })
      )
   }
    api.editUser(this.state.user._id, data)
      .then(result => {
        this.props.onUserChange(this.state.user)
        this.setState({
          message: 'Updated! Yay!'
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2500)
      })
      .catch(err => this.setState({ message: err.toString() }))
    }

    updateDeleteItem = () => {
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
  
  render() {
    if (!this.state.user) {
      return <div>Loading...</div>
    }
      return (
        <div className="profile-page">
          <div className="profile-form-div">
              <Form>
                <div>
                  <label htmlFor="file"><img className="user-img" src={this.state.user.imgPath} width="200px" alt="User avatar"/></label>
                  <input type="file" name="file" id="file" className="input-file" onChange={this.handleChange} />
                </div>
                {/* <Input disabled value={this.state.user.email} /> */}
                <Input type="text" className="" name="username" value={this.state.user.username} onChange={this.handleUserInputChange} />
                {(this.state.file || this.state.user !== this.props.user) && <div className="user-button">
                  <button className="btn-second btn-edit-details" onClick={(e) => this.handleEdit(e)}>Edit details</button>
                </div>}
                {this.state.message && <div className="info">
                  {this.state.message}
                </div>}
              </Form>
          </div>
          <br/><br/><hr/><br/>
          {(this.state.items.length !== 0) && <h2 className="profile-items-h2">All my items</h2>}
          {(this.state.items.length === 0) && <h6 className="profile-items-h2">I have not added any items... yet</h6>}
          <div className="itemCards-container">
            {this.state.items.map(item => <ItemCard key={item._id} name={item.name} owner={item._owner}  id={item._id} imgPath={item.imgPath} location={item.location.coordinates} pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} searchFilter="" categoryFilter={[]} categories={[]}/>)}
          </div>
          <br/><br/><hr/><br/>
          {(this.state.rented.length !== 0) && <h2 className="profile-items-h2">Rented items</h2>}
          {(this.state.rented.length === 0) && <h6 className="profile-items-h2">No rented items</h6>}
          <div className="itemCards-container">
            {this.state.rented.map(item => <ItemCard key={item._id} name={item.name} owner={item._owner}  id={item._id} imgPath={item.imgPath} location={item.location.coordinates} pr
            icePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} searchFilter="" categoryFilter={[]} categories={[]}/>)}
          </div>
          <br/><br/><hr/><br/>
          {(this.state.borrowed.length !== 0) && <h2 className="profile-items-h2">Borrowed items</h2>}
          {(this.state.borrowed.length === 0) && <h6 className="profile-items-h2">No borrowed items</h6>}
          <div className="itemCards-container">
            {this.state.borrowed.map(item => <ItemCard key={item._id} name={item.name} owner={item._owner}  id={item._id} imgPath={item.imgPath} location={item.location.coordinates} pr
            icePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} searchFilter="" categoryFilter={[]} categories={[]}/>)}
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
          console.log(res[2][i].status)
          //if the item appears in a request, keep going
          for(let i = 0; i < res[2].length; i++){
            if (item._id === res[2][i]._item && 
              // if that request's borrower is equal to the user => return true
              res[2][i]._borrower === res[0]._id)
              //only show items that have been accepted, not pending
              // res[2][i].status === "accepted") 
              relevantItem = true 
          }
          return relevantItem;
        }),
      })      
    })
    .catch(err => console.log(err))
   }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user
      })
    }
  }
}

export default Profile;



   