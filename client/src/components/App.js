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
      
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <MainNavbar />
        <div className="empty-div"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/items" exact component={Items} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/items/new" exact  component={AddItem} />
          <Route path="/items/:itemId" exact component={ItemDetail} />
          <Route path="/items/:itemId/edit" exact component={EditItem} />
          <Route path="/items/request/:requestId/accept" exact component={AcceptRequest} />
          <Route path="/login" exact component={LoginSignup} />
          <Route path="/logout" exact component={Home} />
          <Route path="/confirm" exact component={PleaseConfirm} />
          <Route path="/confirm/:confirmationCode" exact component={Confirm} />
          <Route path="/secret" exact component={Secret} />
          <Route render={() => <h2>Front end 404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
