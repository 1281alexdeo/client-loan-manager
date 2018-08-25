import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { auth } = nextProps;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }
  onLogoutClicked = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;
    const { allowRegistration } = this.props.settings;
    const { auth } = this.props;
    return (
      <div className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              </li>
            </ul>

            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="#!">
                    Hi, {auth.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={this.onLogoutClicked}
                    className="nav-link"
                    to="#!"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            ) : null}
            {!isAuthenticated && allowRegistration ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);
