// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

import UserCreateForm from '../components/forms/UserCreateForm';

export class SignUpPage extends Component {
  render(): React$Element<any> {
    return (
      <div>
        <UserCreateForm />
      </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(SignUpPage);
