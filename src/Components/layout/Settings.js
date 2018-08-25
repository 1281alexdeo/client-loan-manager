import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from '../actions/SettingsActions';

export class Settings extends Component {
  onAllowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  onBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  onBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link className="text-primary" to="/">
              {' '}
              <i className="fa fa-arrow-circle-o-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-header">Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Disable Balance On Add</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.onBalanceOnAddChange}
                />
              </div>
              <div className="form-group">
                <label> Disable Balance On Edit</label>{' '}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.onBalanceOnEditChange}
                />
              </div>

              <div className="form-group ">
                <label>Allow Registration</label>{' '}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.onAllowRegistrationChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};
export default connect(
  (state, props) => ({
    settings: state.settings,
    auth: state.firebase.auth
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
