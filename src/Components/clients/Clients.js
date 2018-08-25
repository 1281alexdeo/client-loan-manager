import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Clients extends Component {
  state = {
    totalOwed: null
  };

  //get the clients as they come in and add balances
  static getDerivedStateFromProps(nextProps, prevState) {
    const { clients } = nextProps;
    if (clients) {
      //add balancees
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    } else {
      return null;
    }
  }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    //check if clients has arrived into props
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {' '}
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6 text-right ">
              <h5 className="text-secondary">
                Total Owed:{' '}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      className="btn btn-secondary btn-sm"
                      to={`/client/detail/${client.id}`}
                    >
                      <i className="fas fa-arrow-circle-right "> Details</i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}
Clients.propTypes = {
  clients: PropTypes.array,
  firestore: PropTypes.object.isRequired
};

//Loading data from firestore
export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients //clients from firstore now available in props
  }))
)(Clients);
