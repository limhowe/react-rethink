import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { autobind } from 'core-decorators';

import { domOnlyProps } from '../../helpers/domOnlyProps';
import { createConvUserLink } from '../../redux/actions';
export const fields = [ 'convId' ];

export default class ConvUserLinkCreateForm extends Component {
  @autobind
  handleSubmit(values) {
    this.props.createConvUserLink({
      ...values,
      userId: this.props.currentUser.id
    });
  }

  render() {
    const {fields: {convId}, handleSubmit, submitting, createConvUserLink, conversations, currentUser} = this.props;
    const options = conversations.map((conv) => (<option value={conv.id} key={conv.id}>{conv.title}</option>));
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3>Join Conversation</h3>
        <fieldset>
          <div>
            <label>Conversation</label>
            <select {...domOnlyProps(convId)}>
              <option value=""></option>
              {options}
            </select>
          </div>
          <button type="submit" disabled={submitting}>Join</button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToprops = (state) => ({
  conversations: state.app.conversations,
  currentUser: state.app.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  createConvUserLink: (convUserLinkData) => dispatch(createConvUserLink(convUserLinkData))
});

export default reduxForm({
  form: 'conv-user-link-create',
  fields
})(
  connect(mapStateToprops, mapDispatchToProps)(ConvUserLinkCreateForm)
);
