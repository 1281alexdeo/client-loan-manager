import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  };

  toggle = () => {
    this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate });
  };

  //on submit
  balanceSubmit = e => {
    e.preventDefault();

    const { firestore, client } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount).toFixed(2)
    };
    //update in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
    this.setState({
      showBalanceUpdate: false
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onDeleteClicked = () => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(() => history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceUpdateForm = (
      <form onSubmit={this.balanceSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Add New Balance"
            className="form-control"
            name="balanceUpdateAmount"
            value={balanceUpdateAmount}
            onChange={this.onChange}
          />
          <div className="input-group-append">
            <input
              type="submit"
              value="Update"
              className="btn btn-outline-dark"
            />
          </div>
        </div>
      </form>
    );

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                Back to Dashboard
              </Link>
            </div>
            <div className="col-md-4">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>

                <button
                  onClick={this.onDeleteClicked}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Cient ID:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6 ">
                  <h3 className="pull-right">
                    Balance:{' '}
                    <span
                      className={
                        client.balance > 0 ? 'text-danger' : 'text-success'
                      }
                    >
                      ${parseFloat(client.balance).toFixed(2)}{' '}
                    </span>
                    <small>
                      <a href="#!" onClick={this.toggle}>
                        <i className="fas fa-edit text-dark   " />
                      </a>
                    </small>
                  </h3>
                  {showBalanceUpdate ? balanceUpdateForm : null}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone : {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
