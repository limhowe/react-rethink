// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { domOnlyProps } from 'public/app/helpers/domOnlyProps';
import { Input, Button } from 'react-toolbox';

import { authSignin } from 'public/app/redux/actions';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export const fields = [ 'email', 'password' ];

export class UserCreateForm extends Component {
  render(): React$Element<any> {
    const {fields: {email, password}, handleSubmit, submitting, authSignin, errorMessage} = this.props;
    return (
      <section>
        <form onSubmit={handleSubmit(authSignin)}>
          <h1>Sign In</h1>
          <p>{errorMessage}</p>
          <Input type="email" icon="email" required label="Email" {...domOnlyProps(email)} />
          <Input type="password" icon="lock" required label="Password" {...domOnlyProps(password)} />
          <Button label="Sign In" primary raised />
        </form>
      </section>
    );
  }
}

const mapStateToprops = (state: State) => ({
  errorMessage: state.app.loginForm.error,
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authSignin: (userData) => dispatch(authSignin(userData))
});

export default reduxForm({
  form: 'user-login',
  fields
})(
  connect(mapStateToprops, mapDispatchToProps)(UserCreateForm)
);
