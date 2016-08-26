// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserSignInForm from '../components/forms/UserSignInForm';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export class LoginPage extends Component {
  render(): React$Element<any> {
    return (
        <div>
          <UserSignInForm />
        </div>
    );
  }
}

const mapStateToprops = (state: State) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToprops, mapDispatchToProps)(LoginPage);
