import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './Components/layout/AppNavbar';
import Dashboard from './Components/layout/Dashboard';
import ClientDetails from './Components/clients/ClientDetails';
import { Provider } from 'react-redux';
import store from './Store';
import AddClient from './Components/clients/AddClient';
import EditClient from './Components/clients/EditClient';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Settings from './Components/layout/Settings';
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from './Components/helpers/Auth';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />

                <Route
                  exact
                  path="/client/detail/:id"
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
