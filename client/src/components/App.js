import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import Home from './pages/Home';
import Items from './pages/Items';
import AcceptRequest from './pages/AcceptRequest';
import Profile from './pages/Profile';
import AddItem from './pages/AddItem';
import Secret from './pages/Secret';
import LoginSignup from './pages/LoginSignup';
import Confirm from './pages/Confirm';
import PleaseConfirm from './pages/PleaseConfirm';
import ItemDetail from './pages/ItemDetail';
import EditItem from './pages/EditItem';
import api from '../api';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }

  }

  userSetState = (user) => {
    this.setState({user})
  }

  handleLogoutClick(e) {
    api.logout()
  }
  getProfile = () => {
    api.getProfile()
      .then(user => {
        this.setState({user})
      })
      .catch(err => console.log(err))
  }
  handleLogout = () => {
    this.setState({
      user: null
    })
  }

  render() {
    return (
      <div className="App">
        <MainNavbar user={this.state.user} onLogout={this.handleLogout} />
        <div className="empty-div"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/items" exact component={Items} />
          <Route path="/profile" exact render={props => <Profile {...props} user={this.state.user} onUserChange={user => this.userSetState(user)} />} />
          <Route path="/items/new" exact  component={AddItem} />
          <Route path="/items/:itemId" exact component={ItemDetail} />
          <Route path="/items/:itemId/edit" exact component={EditItem} />
          <Route path="/items/request/:requestId/accept" exact component={AcceptRequest} />
          <Route path="/login" exact render={props => <LoginSignup {...props} onLoginSignup={this.getProfile} />} />
          <Route path="/logout" exact component={Home} />
          <Route path="/confirm" exact component={PleaseConfirm} />
          <Route path="/confirm/:confirmationCode" exact render={props => <Confirm {...props} onConfirm={this.getProfile} />} />
          <Route path="/secret" exact component={Secret} />
          <Route render={() => <h2>404 from your friendly neighbourhood react app.</h2>} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.getProfile()
  }
}

export default App;
