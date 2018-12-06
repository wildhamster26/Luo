import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as NLink, Link } from 'react-router-dom' // Be careful, NavLink is already exported from 'reactstrap'
import api from '../api';



export default class MainNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      hasShadow: false,
    };
  }
  handleLogoutClick(e) {
    api.logout()
    .then(() => {
      this.props.onLogout()
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  shadowToggler = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.setState({
        hasShadow: true
      })
    } else {
      this.setState({
        hasShadow: false
      })
    }
  }

  // componentDidMount() {
  //     api.getProfile()
  //       .then(user => {
  //         this.setState({
  //           username: user.username,
  //           imgPath: user.imgPath,
  //         })
  //       })
  //       .catch(err => console.log(err))
  // }
  

  render() {
    console.log(this.props)
    window.onscroll = () => {this.shadowToggler()};
    return (
      <Navbar color="primary" dark expand="md" className={"MainNavbar" + (this.state.hasShadow ? " hasShadow" : "")}>
        <NavbarBrand to="/" tag={Link}>
          <img src='/images/logo/logo1.png' className="logo" alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            {this.props.user && <NavLink tag={NLink} to="/profile"><img src={this.props.user.imgPath} alt="User avatar" width="20px" /> {this.props.user.username}</NavLink>}
            </NavItem>
            {!api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/login">Login/Signup</NavLink>
            </NavItem>}
            {api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/items/new">Add your item</NavLink>
            </NavItem>}
            {api.isLoggedIn() && <NavItem>
              <NavLink tag={Link} to="/"  onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink>
            </NavItem>}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}