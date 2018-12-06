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
      username: "",
      imgPath: ""
    }
  }

  userSetState = (username, imgPath) => {
    api.getProfile()
        .then(user => {
          this.setState({
            username: user.username,
            imgPath: user.imgPath
          })
        })
        .catch(err => console.log(err))
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <MainNavbar username={this.state.username} imgPath={this.state.imgPath}/>
        <div className="empty-div"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/items" exact component={Items} />
          <Route path="/profile" exact userSetState={this.userSetState} component={Profile} />
          <Route path="/items/new" exact  component={AddItem} />
          <Route path="/items/:itemId" exact component={ItemDetail} />
          <Route path="/items/:itemId/edit" exact component={EditItem} />
          <Route path="/items/request/:requestId/accept" exact component={AcceptRequest} />
          <Route path="/login" exact component={LoginSignup} />
          <Route path="/logout" exact component={Home} />
          <Route path="/confirm" exact component={PleaseConfirm} />
          <Route path="/confirm/:confirmationCode" exact component={Confirm} />
          <Route path="/secret" exact component={Secret} />
          <Route render={() => <h2>404 from your friendly neighbourhood react app.</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
