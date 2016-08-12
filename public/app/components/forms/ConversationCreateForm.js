import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { domOnlyProps } from '../../helpers/domOnlyProps';

import { createConversation } from '../../redux/actions';
export const fields = [ 'title' ];

export default class ConversationCreateForm extends Component {
  render() {
    const {fields: {title}, handleSubmit, submitting, createConversation} = this.props;
    return (
      <form onSubmit={handleSubmit(createConversation)}>
        <h3>Create Conversation</h3>
        <fieldset>
          <div>
            <label>Title</label>
            <input type="text" placeholder="Title" {...domOnlyProps(title)}/>
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
  createConversation: (conversationData) => dispatch(createConversation(conversationData))
});

export default reduxForm({
  form: 'conversation-create',
  fields
})(
  connect(mapStateToprops, mapDispatchToProps)(ConversationCreateForm)
);
