// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
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
    const {fields: {email, password}, handleSubmit, submitting, authSignin, errorMessage, t} = this.props;
    return (
      <section>
        <form onSubmit={handleSubmit(authSignin)}>
          <h1>{t('pageTitles.signIn')}</h1>
          <p>{errorMessage}</p>
          <Input type="email" icon="email" required label={t('fieldLabels.email')} {...domOnlyProps(email)} />
          <Input type="password" icon="lock" required label={t('fieldLabels.password')} {...domOnlyProps(password)} />
          <Button label={t('fieldLabels.signIn')} primary raised />
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
  translate()(connect(mapStateToprops, mapDispatchToProps)(UserCreateForm))
);
