// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { domOnlyProps } from '../../helpers/domOnlyProps';
import { Input, Button } from 'react-toolbox';

import { createUser } from '../../redux/actions';

import type { State } from 'public/app/redux';
import type { Dispatch } from 'redux';

export const fields = [ 'email', 'name', 'password' ];

export class UserCreateForm extends Component {
  render(): React$Element<any> {
    const {fields: {email, name, password}, handleSubmit, submitting, createUser, t} = this.props;
    return (
      <section>
        <form onSubmit={handleSubmit(createUser)}>
          <h1>{t('pageTitles.createUser')}</h1>
          <Input type="email" label={t('fieldLabels.email')} {...domOnlyProps(email)} />
          <Input type="text" label={t('fieldLabels.name')} {...domOnlyProps(name)} />
          <Input type="text" label={t('fieldLabels.password')} {...domOnlyProps(password)} />
          <Button label={t('fieldLabels.submit')} primary raised />
        </form>
      </section>
    );
  }
}

const mapStateToprops = (state: State) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createUser: (userData) => dispatch(createUser(userData))
});

export default reduxForm({
  form: 'user-create',
  fields
})(
  translate()(connect(mapStateToprops, mapDispatchToProps)(UserCreateForm))
);
