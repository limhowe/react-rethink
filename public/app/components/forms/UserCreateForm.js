// @flow
import React, { Component } from 'react';
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
    const {fields: {email, name, password}, handleSubmit, submitting, createUser} = this.props;
    return (
      <section>
        <form onSubmit={handleSubmit(createUser)}>
          <h1>Create User</h1>
          <Input type="email" label="Email" {...domOnlyProps(email)} />
          <Input type="text" label="Name" {...domOnlyProps(name)} />
          <Input type="text" label="Password" {...domOnlyProps(password)} />
          <Button label="Submit" primary raised />
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
  connect(mapStateToprops, mapDispatchToProps)(UserCreateForm)
);
