import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { domOnlyProps } from '../../helpers/domOnlyProps';

import { createUser } from '../../redux/actions';
export const fields = [ 'email', 'name' ];

export default class UserCreateForm extends Component {
  render() {
    const {fields: {email, name}, handleSubmit, submitting, createUser} = this.props;
    return (
      <form onSubmit={handleSubmit(createUser)}>
        <h3>Create User</h3>
        <fieldset>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Email" {...domOnlyProps(email)}/>
          </div>
          <div>
            <label>First Name</label>
            <input type="text" placeholder="Name" {...domOnlyProps(name)}/>
          </div>
          <button type="submit" disabled={submitting}>Submit</button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToprops = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  createUser: (userData) => dispatch(createUser(userData))
});

export default reduxForm({
  form: 'user-create',
  fields
})(
  connect(mapStateToprops, mapDispatchToProps)(UserCreateForm)
);
