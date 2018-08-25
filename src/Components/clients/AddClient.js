import React, { Component, Fragment } from 'react';
import FromInputGroup from '../common/FormInputGroup';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

export class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    balance: '',
    phone: '',
    email: '',
    errors: {}
  };

  onSubmit = e => {
    const { firstName, lastName, email, phone } = this.state;
    e.preventDefault();
    // //check for errors
    if (firstName === '') {
      this.setState({
        errors: {
          firstName: 'Please enter first name'
        }
      });
      return;
    }
    if (lastName === '') {
      this.setState({
        errors: {
          lastName: 'Please enter last name'
        }
      });
      return;
    }
    if (email === '') {
      this.setState({
        errors: {
          email: 'Please enter email address'
        }
      });
      return;
    }
    if (phone === '') {
      this.setState({
        errors: {
          phone: 'Please phone number'
        }
      });
      return;
    }

    const newClient = this.state;

    const { firestore, history } = this.props;

    //if no balance, make 0

    // eslint-disable-next-line
    !newClient.balance ? (newClient.balance = '0') : newClient.balance;

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
    console.log(newClient);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      balance: '',
      errors: {}
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { firstName, lastName, email, balance, phone, errors } = this.state;
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <Fragment>
        <div className="row ">
          <div className="col-md-6 ">
            <Link to="/" className="btn-link btn">
              <i className="fas fa-tachometer-alt text-secondary" /> Back to
              Dashboard
            </Link>
          </div>
        </div>
        <div className="row">
          {' '}
          <div className="col-md-5 ">
            <div className="card">
              <div className="card-header">Add Client</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <FromInputGroup
                    label="First Name"
                    type="text"
                    name="firstName"
                    placeholder="Enter first
                  name"
                    onChange={this.onChange}
                    value={firstName}
                    errors={errors.firstName}
                  />

                  <FromInputGroup
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Enter last
                  name"
                    onChange={this.onChange}
                    value={lastName}
                    errors={errors.lastName}
                  />

                  <FromInputGroup
                    label="Email"
                    type="text"
                    name="email"
                    placeholder="Enter email address"
                    onChange={this.onChange}
                    value={email}
                    errors={errors.email}
                  />

                  <FromInputGroup
                    label="Balance"
                    type="text"
                    name="balance"
                    placeholder="Enter client balance"
                    onChange={this.onChange}
                    value={balance}
                    errors={errors.balance}
                    disabled={disableBalanceOnAdd}
                  />

                  <FromInputGroup
                    label="Phone Number"
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    onChange={this.onChange}
                    value={phone}
                    errors={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-block btn-success"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
