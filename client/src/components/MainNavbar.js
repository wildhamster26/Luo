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
  

  render() {
    window.onscroll = () => {this.shadowToggler()};
    return (
      <Navbar color="primary" dark expand="md" className={"MainNavbar" + (this.state.hasShadow ? " hasShadow" : "")}>
        <NavbarBrand to="/" tag={Link}>
          <img src='/images/logo/logo1.png' className="logo" alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/login">Login/Signup<img style={{marginLeft: "20px"}} className="navbar-img-action" src="/images/login (white).png" alt="login" /></NavLink>
            </NavItem>}
            {api.isLoggedIn() && <NavItem>
              <NavLink tag={NLink} to="/items/new"><img className="navbar-img-action" src="/images/add (white).png" alt="add item" /></NavLink>
              {api.isLoggedIn() && <NavItem>
            <NavLink tag={Link} to="/"  onClick={(e) => this.handleLogoutClick(e)}><img className="navbar-img-action" src="/images/logout (white).png" alt="logout" /></NavLink>
            </NavItem>}
            </NavItem>}
            <NavItem>
              {this.props.user && <NavLink tag={NLink} to="/profile"><img className="navbar-img" src={this.props.user.imgPath} alt="User avatar" /> </NavLink>}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}