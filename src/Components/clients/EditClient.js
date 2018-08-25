import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
  constructor(props) {
    super(props);
    //create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.balanceInput = React.createRef();
    this.phoneInput = React.createRef();
  }

  //on submit function
  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    //construct client to submit
    const updatedClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value,
      phone: this.phoneInput.current.value
    };

    //update in firestore// =>firestore methods returns a promise
    firestore
      .update({ collection: 'clients', doc: client.id }, updatedClient)
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    if (client) {
      const { firstName, lastName, email, balance, phone } = client;
      return (
        //Edit form
        <Fragment>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="nav-link text-primary">
                Back to Dashborad
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Edit Client</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        minLength="2"
                        defaultValue={firstName}
                        ref={this.firstNameInput}
                        className="form-control"
                        placeholder="Enter First Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        minLength="2"
                        defaultValue={lastName}
                        ref={this.lastNameInput}
                        className="form-control"
                        placeholder="Enter Last Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        required
                        name="email"
                        defaultValue={email}
                        ref={this.emailInput}
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="balance">Balance</label>
                      <input
                        type="number"
                        name="balance"
                        defaultValue={balance}
                        ref={this.balanceInput}
                        className="form-control"
                        placeholder="Enter Client's Balance"
                        disabled={disableBalanceOnEdit}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        defaultValue={phone}
                        ref={this.phoneInput}
                        className="form-control"
                        placeholder="Enter Client's Phone Number"
                      />
                    </div>

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
          <div />
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
};
export default compose(
  firestoreConnect(props => [
    {
      collection: 'clients',
      storeAs: 'client',
      doc: props.match.params.id
    }
  ]),
  connect((state, props) => ({
    client: state.firestore.ordered.client && state.firestore.ordered.client[0], //ACCESING THAT SINGLE CLIENT AND PUTTING IN this.props.client
    settings: state.settings
  }))
)(EditClient);
