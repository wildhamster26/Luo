import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import Home from './pages/Home';
import Items from './pages/Items';
import MyItems from './pages/Items';
import AddItem from './pages/AddItem';
import Secret from './pages/Secret';
import LoginSignup from './pages/LoginSignup';
import Confirm from './pages/Confirm';
import PleaseConfirm from './pages/PleaseConfirm';
import ItemDetail from './pages/ItemDetail';
import api from '../api';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
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
          <Route path="/items/:itemId" component={ItemDetail} />
          <Route path="/items" component={Items} />
          <Route path="/myitems" component={MyItems} />
          <Route path="/item/new" component={AddItem} />
          <Route path="/login" component={LoginSignup} />
          <Route path="/logout" component={Home} />
          <Route path="/confirm" exact component={PleaseConfirm} />
          <Route path="/confirm/:confirmationCode" component={Confirm} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>Front end 404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
