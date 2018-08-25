import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { notifyUser } from './../actions/NotifyActions';
import Alert from '../layout/Alert';
export class Register extends Component {
  state = {
    email: '',
    password: ''
  };

  //check settings allowRegistration before mountings
  //if its false then redirect to Home
  componentWillMount = () => {
    const { allowRegistration } = this.props.settings;
    if (!allowRegistration) {
      this.props.history.push('/');
    }
  };

  componentWillUnmount() {
    const { notifyUser } = this.props;
    notifyUser(null, null);
  }
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { firebase, notifyUser } = this.props;

    //Register to firebase
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser('That user already exist', 'error'));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { password, email } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body mt-3 mb-3 ">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}

              <h1 className="text-center">
                <i className="fas fa-lock text-primary " />
                <span className="text-primary">Register</span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    className="form-control"
                    placeholder="Email"
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
