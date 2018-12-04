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
const currentUser = JSON.parse(localStorage.getItem('user'))


// import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      imgPath: "",
      file: "",
      id: "",
      items: [],
      initialUsername: null,
      initialEmail: null
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
    api.editUser(currentUser._id, data)
      .then(result => {
        console.log("result before USER image upload:", result)
        console.log("result before USER image upload:", this.state.file)
        if(this.state.file)
           return api.addUserPicture(this.state.file, result.data._id)
      })
      .then(result => {
        console.log('SUCCESS!', result)
        this.setState({
          message: `Your details have been edited.`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .then(res => {
        this.props.history.push("/profile");
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  
  render() {
      return (
        <div className="profile-page">
          <h1>My Profile</h1>
          <div className="profile-form-div">
              <Form>
                    <Input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                    <Input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                    <div className="user-img">
                      <img src={this.state.imgPath} width="100px" alt="User avatar"/>
                      <Input type="file" name="image" onChange={this.handleChange} />
                    </div>
                    {(this.state.initialUsername !== this.state.username || this.state.initialEmail !== this.state.email) &&
                    <div className="user-button">
                      <Button color="primary" onClick={(e) => this.handleClick(e)}>Edit</Button>
                    </div>}
              </Form>
          </div>
          <div className="itemCards-container">
            {this.state.items.map(item => <ItemCard key={item._id} name={item.name} owner={item._owner}  id={item._id} imgPath={item.imgPath} pricePerPeriod={item.pricePerPeriod} period={item.period} description={item.description} reservedDates={item.reservedDates} date={this.state.date} updateDeleteItem={this.updateDeleteItem} searchFilter="" categoryFilter={[]} categories={[]}/>)}
          </div>
        </div>
      );
  }
  
  componentDidMount() {
    if(localStorage.getItem("user")){
    Promise.all([api.getUser(), api.getItems()])
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
        })
      })      
    })
    .catch(err => console.log(err))
   }
  }
}

export default Profile;
