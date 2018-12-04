import React, { Component } from 'react';

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
      items: []
    }
    // this.mapRef = React.createRef()
    // this.map = null
    // this.markers = []
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
  // initMap() {
  //   // Embed the map where "this.mapRef" is defined in the render
  //   this.map = new mapboxgl.Map({
  //     container: this.mapRef.current,
  //     style: 'mapbox://styles/mapbox/streets-v10',
  //     center: [0, 0], // Africa lng,lat
  //     zoom: 5
  //   })

    // Add zoom control on the top right corner
  //   this.map.addControl(new mapboxgl.NavigationControl())
  // }
  // handleItemSelection(iSelected) {
  //   this.map.setCenter(this.state.items[iSelected].location.coordinates)
  // }
  
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
                  <div className="user-button">
                    <Button color="primary" onClick={(e) => this.handleClick(e)}>Edit</Button>
                  </div>
            </Form>
        </div>
       
        
      </div>
    );
  }
  componentDidMount() {
    if(localStorage.getItem("user")){
    api.getUser()
      .then(user => {
        this.setState({
          username: user.username,
          email: user.email,
          imgPath: user.imgPath,
          id: user._id
        })
      })
      .catch(err => console.log(err))
    }
  }
}

export default Profile;